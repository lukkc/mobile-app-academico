export interface Update {
    _watchForUpdates(): void;

    _unsubscribeWatch(): void;
}