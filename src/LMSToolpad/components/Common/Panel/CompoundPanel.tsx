/** @format */
import React from "react";
import { ScrollerProvider } from "./Scrollable/context/ScrollerContextProvider";
import Panel from "./Main/Panel";
import { PanelProps } from "./Main/Context/PanelContextProvider";
import Scroller from "./Scrollable/Scroller";
import { usePanelContext } from "./Main/Context/PanelContextProvider";

export interface CompoundPanelProps extends PanelProps {
  /**
   * Content to be displayed in the panel
   */
  children: React.ReactNode;
  /**
   * Whether the panel should display in a horizontal scroller
   */
  horizontalScroll?: boolean;
  /**
   * Whether the panel should display in a vertical scroller
   */
  verticalScroll?: boolean;
  /**
   * Optional title for the panel's horizontal scroller
   */
  title?: string;
  /**
   * Priority level for title styling
   */
  priority?: "high" | "low" | "normal";
  /**
   * Automatically arrange children as sections (useful for course sections)
   * Each direct child will be rendered as a horizontal section inside a vertical scroller
   */
  sections?: boolean;
}

/**
 * CompoundPanel - An all-in-one panel component that encapsulates all functionality
 * needed for panels in the LMS system, including scrolling, expanding, and resizing.
 *
 * @example - Simple scrolling panel
 * ```tsx
 * <CompoundPanel
 *   id="my-panel"
 *   defaultWidth={300}
 *   defaultHeight={200}
 *   horizontalScroll={true}
 *   title="My Panel"
 * >
 *   <Item1 />
 *   <Item2 />
 * </CompoundPanel>
 * ```
 *
 * @example - Sectioned panel (auto-creates horizontal sections within vertical scroll)
 * ```tsx
 * <CompoundPanel
 *   id="sections-panel"
 *   sections={true}
 * >
 *   <Section title="Section 1" priority="high">
 *     <Item1 />
 *     <Item2 />
 *   </Section>
 *   <Section title="Section 2">
 *     <Item3 />
 *     <Item4 />
 *   </Section>
 * </CompoundPanel>
 * ```
 */
export const CompoundPanel: React.FC<CompoundPanelProps> = ({
  children,
  horizontalScroll = false,
  verticalScroll = false,
  title,
  priority,
  sections = false,
  ...panelProps
}) => {
  // Always use ScrollerProvider to ensure the context is available
  return (
    <ScrollerProvider>
      <Panel {...panelProps}>
        {sections ? (
          <SectionsContent>{children}</SectionsContent>
        ) : horizontalScroll || verticalScroll ? (
          <ScrollerContent
            horizontalScroll={horizontalScroll}
            verticalScroll={verticalScroll}
            title={title}
            priority={priority}
          >
            {children}
          </ScrollerContent>
        ) : (
          children
        )}
      </Panel>
    </ScrollerProvider>
  );
};

// Generic props for section components
export interface SectionProps {
  title?: string;
  priority?: "high" | "low" | "normal";
  children: React.ReactNode;
}

/**
 * Section - A component that defines a horizontal section within a CompoundPanel.
 * Used with CompoundPanel's sections={true} property.
 *
 * @example
 * ```tsx
 * <CompoundPanel sections={true}>
 *   <Section title="My Section" priority="high">
 *     <Item1 />
 *     <Item2 />
 *   </Section>
 * </CompoundPanel>
 * ```
 */
export const Section: React.FC<SectionProps> = ({
  children,
}) => {
  // Actual implementation is handled by SectionsContent
  // This is just a wrapper component for better developer experience
  return <>{children}</>;
};

// Internal component to handle automatic section rendering
const SectionsContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { minHeight } = usePanelContext();

  // Automatically wrap in vertical scroller
  return (
    <Scroller direction="vertical" itemSize={minHeight} containerSize="100%">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;

        // Check if this is a Section component
        if (child.type === Section) {
          const sectionProps = child.props as SectionProps;
          return (
            <SectionRenderer title={sectionProps.title} priority={sectionProps.priority}>
              {sectionProps.children}
            </SectionRenderer>
          );
        }

        // If not a Section component, just render it directly
        return child;
      })}
    </Scroller>
  );
};

// Internal component to render a single section
const SectionRenderer: React.FC<SectionProps> = ({
  title,
  priority,
  children,
}) => {
  const { minWidth, minHeight } = usePanelContext();

  return (
    <Scroller
      direction="horizontal"
      itemSize={minWidth}
      containerSize={minHeight}
      title={title}
      priority={priority}
    >
      {children}
    </Scroller>
  );
};

interface ScrollerContentProps {
  children: React.ReactNode;
  horizontalScroll?: boolean;
  verticalScroll?: boolean;
  title?: string;
  priority?: "high" | "low" | "normal";
}

// Internal component to handle conditional scrolling logic
const ScrollerContent: React.FC<ScrollerContentProps> = ({
  children,
  horizontalScroll,
  verticalScroll,
  title,
  priority,
}) => {
  const { minHeight, minWidth } = usePanelContext();

  // For horizontally scrolled content
  if (horizontalScroll && !verticalScroll) {
    return (
      <Scroller
        direction="horizontal"
        itemSize={minWidth}
        containerSize={minHeight}
        title={title}
        priority={priority}
      >
        {children}
      </Scroller>
    );
  }

  // For vertically scrolled content
  if (verticalScroll && !horizontalScroll) {
    return (
      <Scroller direction="vertical" itemSize={minHeight} containerSize="100%">
        {children}
      </Scroller>
    );
  }

  // For both horizontal and vertical scrolling (nested scrollers)
  if (horizontalScroll && verticalScroll) {
    return (
      <Scroller direction="vertical" itemSize={minHeight} containerSize="100%">
        <Scroller
          direction="horizontal"
          itemSize={minWidth}
          containerSize={minHeight}
          title={title}
          priority={priority}
        >
          {children}
        </Scroller>
      </Scroller>
    );
  }

  // Fallback to direct rendering
  return <>{children}</>;
};

export default CompoundPanel;
