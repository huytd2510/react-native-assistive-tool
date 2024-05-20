// reducer.ts
interface Route {
  key: string;
  name: string;
  params?: { [key: string]: any };
  state?: any;
}

interface State {
  data: Route[];
}

const initialState: State = {
  data: [
    { key: 'Home-MRO35Hx33XIa7OwdIrDTM', name: 'Home' },
    {
      key: 'NavigationDemo-PcVRLZgxvizMlFmR4GUAk',
      name: 'NavigationDemo',
      state: {
        stale: false,
        type: 'stack',
        key: 'stack-vtFcm2rSAH5LVPzMMKy_Y',
        index: 3,
        routeNames: ['A1', 'A2', 'A3', 'BStack'],
        routes: [
          { key: 'A1-fcAZEPQzUwOWtdiaJD08s', name: 'A1' },
          { key: 'A2-Du5y5obYQUsB8KqFmje3m', name: 'A2' },
          {
            key: 'A3-zQABxcwxWmXa-Irw_W_vQ',
            name: 'A3',
            params: { id: '123123' },
          },
          {
            key: 'BStack-TcnVJ4-1OBonxK8PVD6z6',
            name: 'BStack',
            params: { id: 'HIhi' },
            state: {
              stale: false,
              type: 'stack',
              key: 'stack-XHI_bqoljARGRhbOU09oT',
              index: 1,
              routeNames: ['B1', 'B2', 'B3'],
              routes: [
                { key: 'B1-PFSKRweU0n2ugUMtgHzdX', name: 'B1' },
                { key: 'B2-YvDE2Jblhhv5xqYjkW9sg', name: 'B2' },
              ],
            },
          },
        ],
      },
    },
  ],
};

const dataReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    default:
      return state;
  }
};

export default dataReducer;
