export interface match<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}
