import * as React from "react";

/**
 * Defines an event to debounce.
 */
export interface IDebounceEvent {
    /**
     * The name of the event to debounce.
     */
    event: string;

    /**
     * The number of milliseconds to wait before invoking the event handler.
     */
    delay: number;
}

/**
 * Defines the properties required by the Debounce component.
 */
export type IDebounceProps = React.PropsWithChildren<{
    /**
     * The list of events to debounce.
     */
    events: IDebounceEvent[];
}>

/**
 * Defines the map of debounced events.
 */
interface IDebounceMap {
    /**
     * Property name is a generated key and value is the debounce info.
     */
    [x: string]: IDebounceInfo;
}

/**
 * Defines the debounce information.
 */
interface IDebounceInfo {
    /**
     * The id of an existing delayed event handler.
     */
    changeId: number;

    /**
     * The delayed event handler.
     */
    changeHandler: Function;

    /**
     * The number of milliseconds the event handler is delayed.
     */
    changeDelay: number;
}

/**
 * An element that delays invoking certain event handlers.
 * @param props The properties that define the events to debounce.
 * @returns An element with delayed event handling.
 */
export const Debounce: React.FC<IDebounceProps> = ({ events, children }) => {

    /**
     * The map of debounced events.
     */
    const debounceMap = React.useRef<IDebounceMap>({});

    /**
     * Handles debouncing the event with the specified key.
     * @param key The debounced event key.
     * @param args The original arguments.
     */
    const onDebouncedEvent = (key: string, ...args: unknown[]) => {
        const changeInfo = debounceMap.current[key];
        if (changeInfo) {
            if (changeInfo.changeId) {
                window.clearTimeout(changeInfo.changeId);
            }
            changeInfo.changeId = window.setTimeout(() => {
                if (changeInfo.changeHandler) {
                    changeInfo.changeHandler(...args);
                }
            }, changeInfo.changeDelay);
        }
    }

    return <>
        {React.Children.map(children, (child: any, childIndex: number) => {
            if (events?.length > 0 && child && child.props) {
                let newProps = { ...child.props };
                events.forEach(e => {
                    if (e.event && e.delay >= 0 && typeof newProps[e.event] === "function") {
                        const key = `debounce-${childIndex}-${e.event}`;
                        debounceMap.current[key] = {
                            changeId: 0,
                            changeHandler: newProps[e.event],
                            changeDelay: e.delay
                        };
                        newProps[e.event] = (...args: unknown[]) => {
                            onDebouncedEvent(key, ...args);
                        };
                    }
                });
                return React.cloneElement(child, newProps);
            }
            else {
                return child;
            }
        })}
    </>;
}