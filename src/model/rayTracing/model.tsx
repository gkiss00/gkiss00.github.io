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

export const createCopyBook = (config: Image, camera: Camera, objects: Object[]): string => {
    // create copy book for the configuration of the image
    let configBook: string = "";
    configBook += ("" + config.height).padEnd(6, ' ');
    configBook += ("" + config.width).padEnd(6, ' ');
    configBook += ("" + config.antiAliasing);
    configBook += ("" + config.filter).padEnd(20, ' ');

    // create copy book for the camera
    let cameraBook: string = "";
    cameraBook += ("" + camera.pov.x).padEnd(6, ' ');
    cameraBook += ("" + camera.pov.y).padEnd(6, ' ');
    cameraBook += ("" + camera.pov.z).padEnd(6, ' ');
    cameraBook += ("" + camera.dir.x).padEnd(6, ' ');
    cameraBook += ("" + camera.dir.y).padEnd(6, ' ');
    cameraBook += ("" + camera.dir.z).padEnd(6, ' ');
    cameraBook += ("" + camera.up.x).padEnd(6, ' ');
    cameraBook += ("" + camera.up.y).padEnd(6, ' ');
    cameraBook += ("" + camera.up.z).padEnd(6, ' ');
    cameraBook += ("" + camera.angle).padEnd(3, ' ');

    // create copy book for the objects
    let objectsBook: string = "";
    objectsBook += ("" + objects.length).padEnd(3, ' ');
    for(let i = 0; i < objects.length; ++i) {
        const object: Object = objects[i];
        let objectBook: string = "";
        objectBook += object.type.padEnd(10, ' ');
        for(let j = 0; j < object.values.length; ++j) {
            objectBook += ("" + object.values[j]).padEnd(6, ' ');
        }
        objectBook += ("" + object.translation.x).padEnd(6, ' ');
        objectBook += ("" + object.translation.y).padEnd(6, ' ');
        objectBook += ("" + object.translation.z).padEnd(6, ' ');
        objectBook += ("" + object.scaling.x).padEnd(6, ' ');
        objectBook += ("" + object.scaling.y).padEnd(6, ' ');
        objectBook += ("" + object.scaling.z).padEnd(6, ' ');
        objectBook += ("" + object.rotation.x).padEnd(6, ' ');
        objectBook += ("" + object.rotation.y).padEnd(6, ' ');
        objectBook += ("" + object.rotation.z).padEnd(6, ' ');
        objectBook += ("" + object.color.r).padEnd(3, ' ');
        objectBook += ("" + object.color.g).padEnd(3, ' ');
        objectBook += ("" + object.color.b).padEnd(3, ' ');
        objectBook += ("" + object.color.a).padEnd(3, ' ');
        objectsBook += objectBook;
    }

    // create global copy book
    let copyBook = configBook + cameraBook + objectsBook;
    return copyBook;
}