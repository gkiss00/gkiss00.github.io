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

export class Vector3 {
    x: number = 0;
    y: number = 0;
    z: number = 0;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export class Color {
    r: number;
    g: number;
    b: number;
    a: number = 255;

    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

export enum ObjectType {
    SPHERE = "SPHERE"
}

export const OBJECT_VALUES: Map<ObjectType, [String]> = new Map([
    [ObjectType.SPHERE, ["radius"]]
]);

export class Object {
    type: ObjectType = ObjectType.SPHERE;
    translation: Vector3 = new Vector3(0, 0, 0);
    scaling: Vector3 = new Vector3(1, 1, 1);
    rotation: Vector3 = new Vector3(0, 0, 0);
    values: number[] = [];
    color: Color = new Color(255, 0, 0);

    constructor() {
        if(this.type == ObjectType.SPHERE) {
            this.values.push(30);
        }
    }
}