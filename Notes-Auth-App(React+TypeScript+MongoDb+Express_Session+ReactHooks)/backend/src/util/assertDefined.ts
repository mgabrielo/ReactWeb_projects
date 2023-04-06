export function assertDefined<T>(val: T) : asserts val is NonNullable<T>{
    if(!val ){
        throw Error("Expected Val to be Defined, but got --> "+ val);
    }
}