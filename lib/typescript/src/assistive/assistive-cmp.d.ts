import React from 'react';
export interface DebugAddOnView {
    title: string;
    component: React.ReactNode;
}
interface IAssistiveTouch {
    onPress?: () => void;
    onMoveEnd?: () => void;
    size: number;
    percentage?: number;
    color?: string;
    button?: React.ReactNode;
    children?: React.ReactNode;
    customNetworkComponent?: React.ReactNode;
    navigationRef?: React.Ref<any>;
    hideAssistiveTouch?: boolean;
    callbackEventShowDebugger?: () => void;
    debugAddOnView?: DebugAddOnView[];
}
export declare const AssistiveTouch: React.FC<IAssistiveTouch>;
export {};
//# sourceMappingURL=assistive-cmp.d.ts.map