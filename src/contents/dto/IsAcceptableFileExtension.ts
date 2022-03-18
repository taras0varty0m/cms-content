import { registerDecorator, ValidationOptions } from "class-validator";
import { Extensions } from "./extensions.enum";

export function IsAcceptableFileExtension() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "acceptableFileExtension",
      target: object.constructor,
      propertyName: propertyName,
      options: { message: "Not acceptable file extension" },
      validator: {
        validate(filename: any) {
          return (<any>Object)
            .values(Extensions)
            .includes(filename.split(".").pop());
        },
      },
    });
  };
}
