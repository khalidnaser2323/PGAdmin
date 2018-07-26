export class Constants {
    public static BASE_URL: string = "http://178.128.248.25/api/v1/";
    public static USER_DATA: string = "UserData";
    public static SELECTED_PILLAR: string = "SelectedPillar";
    public static IMAGE_PATH: string = "http://178.128.248.25/api/v1/image/";

    public static APP_TEMPLATES: Array<TemplateModel> = [
        {
            tempId: "1",
            imageURL: "img/temp1.png",
            path: "temp1"
        },
        {
            tempId: "2",
            imageURL: "img/temp2.png",
            path: "temp2"
        }, {
            tempId: "3",
            imageURL: "img/temp3.png",
            path: "temp3"
        }, {
            tempId: "4",
            imageURL: "img/temp4.png",
            path: "temp4"
        }, {
            tempId: "5",
            imageURL: "img/temp5.png",
            path: "temp5"
        }, {
            tempId: "6",
            imageURL: "img/temp6.png",
            path: "temp6"
        }, {
            tempId: "7",
            imageURL: "img/temp7.png",
            path: "temp7"
        }, {
            tempId: "8",
            imageURL: "img/temp8.png",
            path: "temp8"
        }, {
            tempId: "9",
            imageURL: "img/temp9.png",
            path: "temp9"
        },
        {
            tempId: "10",
            imageURL: "img/temp10.png",
            path: "temp10"
        }, {
            tempId: "11",
            imageURL: "img/temp11.png",
            path: "temp11"
        }, {
            tempId: "12",
            imageURL: "img/temp12.png",
            path: "temp12"
        }
    ];
    public static guidGenerator(): string {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };
}