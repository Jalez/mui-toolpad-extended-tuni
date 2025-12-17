/** @format */

import { UserEvent, UserData } from "./userTypes";
import { useUserStore } from "../Users/store/useUserStore";

/**
 * User Bus for decoupling user state changes from consumers.
 * Modules can subscribe to user events and react to user state changes.
 * This follows the same pattern as EventBus but is specifically for user-related events.
 */
export class UserBus {
  private static instance: UserBus;
  private subscribers: Set<(event: UserEvent) => void> = new Set();
  private currentUser: UserData | null = null;
  private lastEvent: UserEvent | null = null;

  private constructor() {}

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
    const store = useUserStore.getState();
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
   * Delegates to useUserStore.getUser() and publishes event when complete
   */
  async getUser(): Promise<void> {
    const store = useUserStore.getState();
    await store.getUser();
    // UserEventPublisher will publish the event when user changes
  }

  /**
   * Update user and publish event
   * Delegates to useUserStore.updateUser() and publishes event
   */
  async updateUser(userData: UserData): Promise<UserData> {
    const store = useUserStore.getState();
    const previousUser = store.user;
    const updatedUser = await store.updateUser(userData);
    
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
   * Delegates to useUserStore.setUserToUpdate()
   */
  setUserToUpdate(user: UserData | null): void {
    const store = useUserStore.getState();
    store.setUserToUpdate(user);
  }

  /**
   * Fetch course users
   * Delegates to useUserStore.fetchCourseUsers()
   */
  async fetchCourseUsers(courseId: string): Promise<void> {
    const store = useUserStore.getState();
    await store.fetchCourseUsers(courseId);
    // Note: courseUsers are stored in store, not published to bus
    // Components that need courseUsers can access via store or we could add a getter
  }

  /**
   * Get course users from store
   * @returns Course users array or undefined
   */
  getCourseUsers(): UserData[] | undefined {
    const store = useUserStore.getState();
    return store.courseUsers;
  }

  /**
   * Logout user and publish event
   * Delegates to useUserStore.logout() and publishes event
   */
  async logout(): Promise<void> {
    const store = useUserStore.getState();
    await store.logout();
    
    // Publish logout event
    this.publish({
      type: "user:loggedOut",
      user: null,
      timestamp: new Date().toISOString(),
    });
  }
}

// Export singleton instance
export const userBus = UserBus.getInstance();
