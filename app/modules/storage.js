class Storage {
    getState() {
        return localStorage.getItem('test-t-storage') ? JSON.parse(localStorage.getItem('test-t-storage')) : {};
    }

    subscribe(func) {
        if (func instanceof Function) {
            this.updateFunc = func;
        } else {
            throw new Error('func must be a function')
        }
    }

    update(state) {
        localStorage.setItem('test-t-storage', JSON.stringify(state));
        this.updateFunc && this.updateFunc();
    }
}

export default new Storage;