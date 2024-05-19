import React from 'react';
interface IAssistiveTouch {
    onPress?: () => void;
    onMoveEnd?: () => void;
    size: number;
    percentage?: number;
    color?: string;
    button?: React.ReactNode;
    children?: React.ReactNode;
    customNetworkComponent?: React.ReactNode;
}
export declare const AssistiveTouch: React.FC<IAssistiveTouch>;
export {};
//# sourceMappingURL=assistive-cmp.d.ts.map