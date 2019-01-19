type InstalledCredentials = {
    installed: {
        client_secret: string,
        client_id: string,
        redirect_uris: string[]
    }
};

class NestedError extends Error {
    constructor(
        public where: string,
        public error: any
    ) {
        super(where);
    }
}

export {
    NestedError,
    InstalledCredentials
};
