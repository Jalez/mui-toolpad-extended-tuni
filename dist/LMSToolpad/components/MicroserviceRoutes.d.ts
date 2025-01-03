/** @format */
import React from 'react';
export interface MicroserviceConfig {
    path: string;
    Component: React.ComponentType;
    fetchHooks?: Array<(courseId: string) => void>;
    buildNavigation?: (courseId: string, isTeacher: boolean) => any[];
}
interface MicroserviceRoutesProps {
    microservices: MicroserviceConfig[];
}
/**
 * @description - This component is responsible for rendering the microservices routes, fetching data and building navigation for each microservice based on the current course and user.

 * @param {MicroserviceConfig[]} props.microservices -  List of microservices to render
 * @returns  {React.ReactElement} - Returns the microservices routes
 */
declare const MicroserviceRoutes: React.FC<MicroserviceRoutesProps>;
export default MicroserviceRoutes;
