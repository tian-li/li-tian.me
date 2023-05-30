import { split, last, reduce } from 'lodash';

export function extractQueryList(url: string): Record<string, string> {
  const queryString = last(split(url, '?'));
  const queryPairs: string[] = split(queryString, '&');
  return reduce(
    queryPairs,
    (result: { [key: string]: string }, queryPair: string) => {
      const pair: string[] = split(queryPair, '=');
      result[pair[0]] = pair[1] ? pair[1] : 'true';
      return result;
    },
    {}
  );
}
