type Function = (...args: any[]) => any;

class ConfrimDialogModel {
    title: string;
    action: Function;

    public constructor(title: string, action: Function) {
        this.title = title;
        this.action = action;
    }
}

export default ConfrimDialogModel;