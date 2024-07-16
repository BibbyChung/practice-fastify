import { BehaviorSubject, Subject } from "rxjs";

// rxjs
export const getSubject = <T>() => new Subject<T>();
export const getBehaviorSubject = <T>(v: T) => new BehaviorSubject(v);
