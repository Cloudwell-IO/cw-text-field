import * as React from "react";

/**
 * Defines the map of debounced events.
 */
interface IDebounceMap {
    /**
     * Property name is a generated key and value is the debounce info.
     */
    [x: string]: number;
}

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

    /**
     * The event handler to invoke immediately when each event occurs. The debounced event handler will still be invoked after the delay.
     */
    handler?: CallableFunction;
}

/**
 * Defines the events to debounce.
 */
export interface IDebounceEvents {
    /**
     * The key can either be the name of an event to debounce or the name of an event to debounce followed by the word "Immediate" (i.e. onChangeImmediate).
     *
     * If the key is the name of an event to debounce, then the value must be the number of milliseconds to wait before invoking the event handler.
     * If the key is the name of an event to debounce followed by the word "Immediate", then the value must be a CallableFunction that matches the event handler signature to be called immediately when each event occurs.
     */
    [key: string]: number | CallableFunction;
}

/**
 * Defines the properties required by the Debounce component.
 */
export type IDebounceProps = React.PropsWithChildren<{
    /**
     * The list of events to debounce.
     */
    events: IDebounceEvent[] | IDebounceEvents;
}>

/**
 * An element that delays invoking certain event handlers.
 * @param props The properties that define the events to debounce.
 * @returns An element with delayed event handling.
 */
export const Debounce: React.FC<IDebounceProps> = (props) => {

    const eventMap = React.useRef<IDebounceMap>({});

    const getEvents = (): IDebounceEvent[] => {
        if (Array.isArray(props.events)) {
            return props.events;
        }
        else if (typeof props.events === "object") {
            let retVal: IDebounceEvent[] = [];
            const eventsObj: any = props.events;
            Object.keys(eventsObj).forEach(key => {
                if (typeof key === "string" && !key.endsWith("Immediate") && !Number.isNaN(eventsObj[key])) {
                    retVal.push({
                        event: key,
                        delay: eventsObj[key],
                        handler: eventsObj[`${key}Immediate`]
                    });
                }
            });
            return retVal;
        }
        else {
            return [];
        }
    }

    const events = getEvents();

    return <>
        {React.Children.map(props.children, (child: any) => {
            if (events?.length > 0 && child && child.props) {
                let newProps = { ...child.props };
                events.forEach(e => {
                    if (e.event && e.delay >= 0 && typeof newProps[e.event] === "function") {
                        const eventHandler = newProps[e.event];
                        newProps[e.event] = (...args: unknown[]) => {
                            if (eventMap.current[e.event]) {
                                window.clearTimeout(eventMap.current[e.event]);
                            }
                            eventMap.current[e.event] = window.setTimeout(() => {
                                eventHandler(...args);
                            }, e.delay);
                            if (typeof e.handler === "function") {
                                e.handler(...args);
                            }
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