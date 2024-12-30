declare const ActionFCWrapper: <T extends Record<string, unknown>>({ ActionHandler, props }: {
    ActionHandler: import("react").FC<T>;
    props: T;
}) => import("react/jsx-runtime").JSX.Element;
export default ActionFCWrapper;
