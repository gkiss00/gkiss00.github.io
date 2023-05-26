export enum Filter {
    NONE = "NONE",
    SEPIA = "SEPIA",
    AVERAGE_GREYSCALE = "AVERAGE_GREYSCALE",
    WEIGHTED_GREYSCALE = "WEIGHTED_GREYSCALE",
    INVERSE = "INVERSE"
}

export class Image {
    height: number = 300;
    width: number = 300;
    antiAliasing: number = 1;
    filter: string = "NONE";
}

export class Camera {
    pov: Vector3 = new Vector3(0, 0, 0);
    dir: Vector3 = new Vector3(1, 0, 0);
    up: Vector3 = new Vector3(0, 0, 1);
    angle:number = 90;
}

class Vector3 {
    x: number = 0;
    y: number = 0;
    z: number = 0;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}