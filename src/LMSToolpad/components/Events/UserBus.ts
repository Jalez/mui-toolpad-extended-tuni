/** @format */

import { UserEvent, UserData } from "./userTypes";

/**
 * Configuration interface for UserBus store methods.
 * This allows UserBus to work with any user store implementation.
 */
export interface UserBusStoreConfig {
  getUser: () => Promise<void>;
  updateUser: (userData: UserData) => Promise<UserData>;
  setUserToUpdate: (user: UserData | null) => void;
  fetchCourseUsers: (courseId: string) => Promise<void>;
  logout: () => Promise<void>;
  getState: () => {
    user: UserData | null;
    courseUsers?: UserData[];
  };
}

/**
 * User Bus for decoupling user state changes from consumers.
 * Modules can subscribe to user events and react to user state changes.
 * This follows the same pattern as EventBus but is specifically for user-related events.
 * 
 * UserBus requires store methods to be configured via configureStore() before use.
 * This allows it to work without direct dependencies on user store implementations.
 */
export class UserBus {
  private static instance: UserBus;
  private subscribers: Set<(event: UserEvent) => void> = new Set();
  private currentUser: UserData | null = null;
  private lastEvent: UserEvent | null = null;
  private storeConfig: UserBusStoreConfig | null = null;

  private constructor() {}
  
  /**
   * Configure UserBus with store methods.
   * This must be called before using store-dependent methods.
   */
  configureStore(config: UserBusStoreConfig): void {
    this.storeConfig = config;
  }
  
  private getStoreConfig(): UserBusStoreConfig {
    if (!this.storeConfig) {
      throw new Error('UserBus store not configured. Call configureStore() first.');
    }
    return this.storeConfig;
  }

  static getInstance(): UserBus {
    if (!UserBus.instance) {
      UserBus.instance = new UserBus();
    }
    return UserBus.instance;
  }

  /**
   * Subscribe to user event updates
   * @param callback Function to call when user events occur
   * @returns Unsubscribe function
   */
  subscribe(callback: (event: UserEvent) => void): () => void {
    this.subscribers.add(callback);

    // Send last event immediately if available
    if (this.lastEvent) {
      callback(this.lastEvent);
    }

    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback);
    };
  }

  /**
   * Publish a user event to the bus
   * @param event User event to publish
   */
  publish(event: UserEvent): void {
    this.lastEvent = event;
    
    // Update current user if event contains user data
    if (event.user) {
      this.currentUser = event.user;
    } else if (event.type === "user:loggedOut") {
      this.currentUser = null;
    }

    // Notify all subscribers
    this.subscribers.forEach(callback => callback(event));
  }

  /**
   * Get the current user synchronously
   * @returns Current user data or null
   */
  getCurrentUser(): UserData | null {
    return this.currentUser;
  }

  /**
   * Get the current user synchronously (alias for getCurrentUser)
   * @returns Current user data or null
   */
  getCurrentUserSync(): UserData | null {
    return this.currentUser;
  }

  /**
   * Subscribe to user updates and get current user
   * @param callback Function to call with current user and updates
   * @returns Unsubscribe function
   */
  subscribeToUser(callback: (user: UserData | null) => void): () => void {
    // Send current user immediately
    callback(this.currentUser);

    // Subscribe to updates
    return this.subscribe((event) => {
      callback(event.user);
    });
  }

  /**
   * Get the last user event
   * @returns Last user event or null
   */
  getLastEvent(): UserEvent | null {
    return this.lastEvent;
  }

  /**
   * Clear all user state
   */
  clear(): void {
    this.currentUser = null;
    this.lastEvent = null;
    this.subscribers.forEach(callback =>
      callback({
        type: "user:loggedOut",
        user: null,
        timestamp: new Date().toISOString(),
      })
    );
  }

  /**
   * Initialize UserBus with current user from store
   * Should be called by UserEventPublisher on mount
   */
  initializeFromStore(): void {
    const store = this.getStoreConfig().getState();
    if (store.user && !this.currentUser) {
      this.currentUser = store.user;
      this.publish({
        type: "user:loggedIn",
        user: store.user,
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Get user from store and publish to bus
   * Delegates to store.getUser() and publishes event when complete
   */
  async getUser(): Promise<void> {
    const config = this.getStoreConfig();
    await config.getUser();
    // UserEventPublisher will publish the event when user changes
  }

  /**
   * Update user and publish event
   * Delegates to store.updateUser() and publishes event
   */
  async updateUser(userData: UserData): Promise<UserData> {
    const config = this.getStoreConfig();
    const store = config.getState();
    const previousUser = store.user;
    const updatedUser = await config.updateUser(userData);
    
    // Publish update event
    this.publish({
      type: "user:updated",
      user: updatedUser,
      timestamp: new Date().toISOString(),
      metadata: { previousUser },
    });

    return updatedUser;
  }

  /**
   * Set user to update (for editing)
   * Delegates to store.setUserToUpdate()
   */
  setUserToUpdate(user: UserData | null): void {
    const config = this.getStoreConfig();
    config.setUserToUpdate(user);
  }

  /**
   * Fetch course users
   * Delegates to store.fetchCourseUsers()
   */
  async fetchCourseUsers(courseId: string): Promise<void> {
    const config = this.getStoreConfig();
    await config.fetchCourseUsers(courseId);
    // Note: courseUsers are stored in store, not published to bus
    // Components that need courseUsers can access via store or we could add a getter
  }

  /**
   * Get course users from store
   * @returns Course users array or undefined
   */
  getCourseUsers(): UserData[] | undefined {
    const store = this.getStoreConfig().getState();
    return store.courseUsers;
  }

  /**
   * Logout user and publish event
   * Delegates to store.logout() and publishes event
   */
  async logout(): Promise<void> {
    const config = this.getStoreConfig();
    await config.logout();
    
    // Publish logout event
    this.publish({
      type: "user:loggedOut",
      user: null,
      timestamp: new Date().toISOString(),
    });
  }
}

// Export singleton instance (without store configuration)
// Store configuration should be done by the users extension package or by consumers
export const userBus = UserBus.getInstance();
