

export const usePipe = 
(...fns: any) => 
  (value: any) => {
    return fns.reduce((result: any, fn: any) => fn(result), value)
  }