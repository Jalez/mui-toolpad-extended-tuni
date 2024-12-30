type NullStateWarningProps = {
    states: {
        [key: string]: any;
    }[];
    children: React.ReactNode;
};
declare const NullStateWarning: ({ states, children }: NullStateWarningProps) => import("react/jsx-runtime").JSX.Element;
export default NullStateWarning;
