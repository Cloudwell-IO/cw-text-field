/**
 * @summary Debounces the specified function using the specified delay.
 * @param callback The code to debounce.
 * @param delay The number of milliseconds to wait.
 * @param immediate Optional. Code that is not debounced.
 */
export function debounce<T extends Function = Function>(callback: T, delay: number, immediate?: T): T {
    let id: number = NaN;
    return ((...args: unknown[]) => {
        if (!isNaN(id)) {
            clearTimeout(id);
        }
        id = setTimeout(() => {
            callback(...args);
        }, delay)
        if (typeof immediate === "function") {
            immediate(...args);
        }
    }) as unknown as T;
}