const update_listeners: (() => void | Promise<void>)[] = [];

export function add_update_listener(listener: () => void | Promise<void>) {
    update_listeners.push(listener);
}
export async function broadcast_update() {
    await Promise.all(update_listeners.map(listener => (async () => listener())()));
}
