import {
  BehaviorSubject,
  filter,
  map,
  merge,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  tap,
  type Subscriber,
  type TeardownLogic,
} from "rxjs";

// rxjs
export const getSubject = <T>() => new Subject<T>();
export const getBehaviorSubject = <T>(v: T) => new BehaviorSubject(v);
export const getObservable = <T>(
  subscribe?:
    | ((this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic)
    | undefined
) => new Observable(subscribe);
export const getObserverSubscribe = <T>(ob: Subscriber<T>) => {
  return {
    onData: (v: T) => ob.next(v),
    onError: (err: unknown) => ob.error(err),
    onComplete: () => ob.complete(),
  };
};

export const myTrace =
  <T>(messageKey: string) =>
  (source$: Observable<T>) =>
    source$.pipe(
      tap((obj) => {
        console.log(`===== ${messageKey} =====`);
        console.log(obj);
      })
    );

// window
export const isClient = () => {
  try {
    if (window) {
      return true;
    }
    return false;
  } catch (err) {
    return true;
  }
};

export type windowType = Window & typeof globalThis;
const window$ = getBehaviorSubject<windowType | null>(null);
export const setWindow = (w: windowType) => {
  window$.next(w);
};
export const getWindow = () =>
  window$.pipe(
    filter((a) => !!a),
    map((a) => a as windowType)
  );

// location
export const getLocation = () => getWindow().pipe(map((a) => a.location));

export const redirectByNativeBrowser = (path: string) =>
  of(true).pipe(
    take(1),
    tap(() => {
      window.location.href = path;
    })
  );

// theme
const themeKey = "theme";
const theme$ = getSubject<themeMode>();
export type themeMode = "light" | "dark";
export const getTheme = () => {
  const defaultThemeMode: themeMode = "dark";
  let v = localStorage.getItem(themeKey) as themeMode;
  if (v === null) {
    v = defaultThemeMode;
    localStorage.setItem(themeKey, defaultThemeMode);
  }
  return merge(of(v), theme$);
};
export const setTheme = (v: themeMode) => {
  theme$.next(v);
  localStorage.setItem(themeKey, v);
};

// // notify
// export type NotifierType = 'info' | 'success' | 'warning' | 'danger';
// export const notify = (
//   type: NotifierType = 'info',
//   text: string,
//   title = '',
//   timeout = 4000
// ) => {
//   const tt = title === '' ? type.toString().toUpperCase() : title;

//   return of(true).pipe(
//     switchMap(() => import('notifier-js')),
//     tap(({ show: showNotify }) => showNotify(tt, text, type, '', timeout))
//   );
// };

// modal
export type ModalPropsType = { props: Record<string | "btnSubmit$", any> };
export type ModalType<T extends ModalPropsType> = {
  component: any;
  width?: string;
  options?: T;
};

const modals$ = getBehaviorSubject<Array<ModalType<ModalPropsType>>>([]);
export const getModals = () => {
  return modals$;
};
export const showModal = <T extends ModalType<ModalPropsType>>(obj: T) => {
  const arr = [...modals$.value, obj];
  modals$.next(arr);
};
export const closeModal = () => {
  const arr = modals$.value;
  arr.pop();
  modals$.next(arr);
};

export const preventBodyScroll = (isOpen: boolean) =>
  of(true).pipe(
    switchMap(() => getWindow().pipe(take(1))),
    tap((w) => {
      const body = w.document.body;
      if (isOpen) {
        body.classList.add("overflow-hidden");
      } else {
        body.classList.remove("overflow-hidden");
      }
    })
  );

// --- ooo ---

// --- app ---
