import React, { useState } from 'react';
import './InfinityLoop.scss';

export default props => {
    const infinityDescription = {};
    props.content.stages.forEach((elem, index) => {
        infinityDescription[elem] = props.content.text[index];
    });
    const [infinityDescriptionShow, handleInfinityDescriptionShow] = useState(false);
    const [infinityDescriptionTitle, setInfinityDescriptionTitle] = useState('');
    const [infinityDescriptionText, setInfinityDescriptionText] = useState('');
    const [currentDescriptionId, setCurrentDescriptionId] = useState(0);

    const infinityHandleClick = (e, type) => {
        handleInfinityDescriptionShow(true);
        if (e.target.id === currentDescriptionId) {
            setInfinityDescriptionTitle(type);
            setInfinityDescriptionText(infinityDescription[type]);
            setCurrentDescriptionId(e.target.id);
        } else {
            setInfinityDescriptionTitle(type);
            setInfinityDescriptionText(infinityDescription[type]);
            setCurrentDescriptionId(e.target.id);
        }
    };

    return (
        <div className="infinityContainer">
            <div className="infinityImageContainer">
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1016.218" viewBox="0 0 1016.218 520.984">
                    <g id="Calque_1" data-name="Calque 1" transform="translate(-136.782 -109.016)">
                        <path id="Path_678" data-name="Path 678" d="M645,439l57-82,8.68,14.07L653,453Z" fill="#262626" opacity="0.18" />
                        <path id="Path_679 codePath" className="codePath" onMouseOver={e => infinityHandleClick(e, 'Code')} data-name="Path 679" d="M215.36,258.11l62.38-17c16.13-15,37.11-27.92,64.43-36.39,35.11-10.88,67.58-6.52,96,5.12L420.45,158,473,130c-46.25-20.58-99.74-29.19-157.85-11.18s-97.94,49-125.23,83.24Z" fill="#58bead" />
                        <path id="Path_680" data-name="Path 680" d="M296.58,179.88c.23.48.49,1,.72,1.47,2.39,4.61,2.89,8.92-2.21,11.9-7.52,4.39-10.8-.1-14.62-6.64l-2-3.49c-3.45-6.36-5.67-11.29,1.65-15.57,4.13-2.32,7.64-1.56,10.41,2.43a13.441,13.441,0,0,1,1.19,1.81l-4.52,2.63c-1.11-1.45-2.66-4.49-4.92-3.17-3.6,2.1-.8,6.21.31,8.1l4,6.8c1.18,2,3.27,5.24,6.41,3.4,2.52-1.47-.14-5.35-1-7Z" fill="#f2f2f2" />
                        <path id="Path_681" data-name="Path 681" d="M300.34,178.24c-3-6.67-4.84-11,1.93-14s8.62,1.25,11.66,7.9,3.43,10.08-2.41,12.59C305.67,187.47,303.36,185,300.34,178.24Zm5.7.67c1.07,2.38,1.75,3.32,3.92,2.34s1.78-2.05.7-4.43l-2.93-6.48c-.82-1.83-1.66-3.7-3.91-2.68s-1.54,2.94-.71,4.76Z" fill="#f2f2f2" />
                        <path id="Path_682" data-name="Path 682" d="M329.42,174.71h-.07a4.26,4.26,0,0,1-3.11,4.05c-3.94,1.34-6-2-7.18-5.16l-2.48-7.32c-1.78-5.59-.55-7.73,2.44-8.83a4.25,4.25,0,0,1,5,1.18h.07a11.142,11.142,0,0,1-.75-1.74L321,150l4.67-1.58,9.12,26.91-4.67,1.58Zm-3.57-10.55c-.48-1.64-1.52-4.48-3.71-3.74s-1.33,2.57-.79,4.62l2.28,6.75c.77,1.9,1.79,3.27,3.23,2.79s1.83-2,1-4.36Z" fill="#f2f2f2" />
                        <path id="Path_683 releasePath" className="releasePath" data-name="Path 683" d="M335.38,160.53c-1.38-4.84.46-8.24,5.17-9.36,6.67-1.58,8.19,1.72,9.54,7.39l.66,2.8-9.57,2.27.71,3c.69,2.72,1.84,3,3.28,2.65,1.76-.42,2-1.83,1.28-4.43l4.79-1.14c1.28,4.6.07,8-4.83,9.17-5.53,1.31-8.39-.77-9.73-6.92Zm9.71-1.72-.43-1.8c-.53-2.09-1.24-2.63-3.16-2.17-2.39.57-1.85,2.38-1.4,4.26l.2.85Z" fill="#f2f2f2" />
                        <path id="Path_684 releasePath" className="releasePath" onMouseOver={e => infinityHandleClick(e, 'Release')} data-name="Path 684" d="M701.64,357.54l33.93-47.33h-.06s36.17-57.66,93.53-90.14l15.09-49.37-54.58-26.81C702.14,194.14,646.62,281.27,644.89,284l-58.33,73.54-34.88,52.24c-11.89,24.58-50.23,72.07-105.07,94.32L499,533.41l-19.83,54.24c85.7-34.91,145.62-109.15,164.23-147.6Z" fill="#4ea0cd" />
                        <path id="Path_685 build" data-name="Path 685" d="M614.42,402.12l10.07,6.94-3,4.37L598.1,397.3l5.69-8.26c2.6-3.77,5.89-5.74,10.2-2.77,2.55,1.76,4.78,4.27,3.17,7.48h.06c2.13-2.35,4.32-2,6.56-.44,1,.66,6.62,4.74,8,4.16l.43.3-3.31,4.8c-1.86-.5-4.67-2.57-6.25-3.62s-3.39-2.34-4.86-1.15a16.25,16.25,0,0,0-2.87,3.5ZM611,399.75l2.36-3.43c.9-1.49.74-3.26-1.6-4.88-2.62-1.8-3.81-1-5,.62l-2.23,3.24Z" fill="#f2f2f2" />
                        <path id="Path_686" data-name="Path 686" d="M622.48,387.19c-4.34-2.56-5.34-6.29-2.68-10.35,3.75-5.73,7.12-4.39,12-1.19l2.41,1.57-5.39,8.24,2.6,1.7c2.36,1.5,3.39.9,4.2-.33,1-1.52.17-2.69-2.12-4.1l2.7-4.12c4.09,2.45,5.55,5.76,2.79,10-3.11,4.75-6.62,5.21-11.82,1.67Zm5.87-7.92-1.56-1c-1.82-1.15-2.71-1.05-3.78.6-1.35,2.06.3,3,1.91,4.06l.73.48Z" fill="#f2f2f2" />
                        <path id="Path_687" data-name="Path 687" d="M644.85,378.44l-24.07-15.08,2.61-4.17,24.07,15.08Z" fill="#f2f2f2" />
                        <path id="Path_688" data-name="Path 688" d="M638,362.64c-4.35-2.54-5.37-6.27-2.73-10.34,3.72-5.75,7.1-4.42,12-1.25l2.41,1.57-5.35,8.26,2.61,1.69c2.37,1.49,3.39.89,4.19-.35,1-1.53.17-2.69-2.13-4.09l2.7-4.13c4.11,2.43,5.58,5.73,2.85,10-3.09,4.77-6.6,5.24-11.82,1.73Zm5.83-7.95-1.56-1c-1.83-1.14-2.71-1-3.78.62-1.34,2.06.31,3,1.93,4.05l.73.47Z" fill="#f2f2f2" />
                        <path id="Path_689" data-name="Path 689" d="M665.92,346.71a4,4,0,0,1-1.95-1.06l-.05.06a6.23,6.23,0,0,1,.48,2.8,4.33,4.33,0,0,1-.81,2.32c-2.35,3.2-5,3.41-8.54.81-3.94-2.89-2.84-6.36-1.83-10.42.53-2.19.22-3.36-1.43-4.06-.9-.38-1.47.14-2.26,1.21-1.32,1.8-.6,2.8,1,3.91l-2.79,3.79c-3.28-2.37-4.78-5.12-1.13-10.1,4-5.4,7.06-3.64,9.27-1.92L666,341.52a11.218,11.218,0,0,0,2.66,1.44Zm-9.47-6.12c0,1.47-.25,3.16-.16,4.82a3.29,3.29,0,0,0,1.58,2.2c1.32,1,2.49,1.22,3.57-.25,1.73-2.35-1.55-4.09-3.13-5.4Z" fill="#f2f2f2" />
                        <path id="Path_690" data-name="Path 690" d="M668.16,332.24c2.85,2.76,3.7,1.5,4.41.62a1.9,1.9,0,0,0-.59-3.09c-1-.7-2.4,0-3.49.31l-3.13.94c-2.87.86-5.4.87-7.8-1-2.57-2.06-2.42-5.28.54-9s6.3-3.89,9.81-.94l-3.07,3.85c-1.8-1.58-2.93-1.61-4-.28-.73.92-.88,2,.06,2.71s2,.43,3.09.09l4.63-1.43c1.34-.53,4.17-.79,5.39,0,3.16,2,5.61,5.11,1.36,10.44-1.64,2-5.54,5.17-10.28.66Z" fill="#f2f2f2" />
                        <path id="Path_691" data-name="Path 691" d="M670.89,317.76c-4-3.09-4.51-6.91-1.37-10.61,4.44-5.22,7.62-3.47,12.06.31l2.2,1.87-6.38,7.5,2.37,2c2.16,1.79,3.25,1.33,4.2.2,1.18-1.39.52-2.65-1.58-4.33l3.19-3.76c3.76,2.95,4.79,6.41,1.53,10.25-3.68,4.33-7.23,4.35-12,.19Zm6.81-7.13-1.41-1.21c-1.67-1.37-2.56-1.37-3.84.13-1.59,1.87-.07,3,1.4,4.26l.66.57Z" fill="#f2f2f2" />
                        <path id="Path_692 buildPath" className="buildPath" onMouseOver={e => infinityHandleClick(e, 'Build')} data-name="Path 692" d="M230.63,487.64l15.47-59.52c-25.16-49.15-24-107.95,5.66-155.47.39-.63.8-1.26,1.2-1.9L203,284.37l-27.93-61.55c-.52.81-1,1.62-1.55,2.43C124.34,304,125.24,402.58,172,482.08Z" fill="#4ea0cd" />
                        <path id="Path_693" data-name="Path 693" d="M207.42,410.62l-27.6,6.75-2-8.31c-.54-2.21-.93-4.41.59-6.34a7.62,7.62,0,0,1,4.63-2.58c2.4-.59,4.88-.65,6.59,1.9h.07c-.3-3,1.86-4.71,5.42-5.58a13.629,13.629,0,0,1,3.48-.46c3.76.25,5.72,1.88,6.62,5.55Zm-17.94-2.08c-.31-1.25-.63-2.89-1.86-3.45a5.539,5.539,0,0,0-3.12.18c-2.06.51-3,1.2-2.48,3.57l.59,2.39,7.1-1.73Zm12.36-3.18a8,8,0,0,0-1.05-3c-1-1.25-2.82-1-4.22-.65-3,.73-4.08,1.63-3.3,4.83l.49,2,8.35-2Z" fill="#f2f2f2" />
                        <path id="Path_694" data-name="Path 694" d="M198.19,382.06v.07c2.63.36,4,1.6,4.41,3.95.6,3.86-1.25,5-4.76,5.58l-16.17,2.51-.76-4.86,14.45-2.25a5.28,5.28,0,0,0,2.73-.92,1.93,1.93,0,0,0,.44-1.61c-.36-2.28-2.93-1.84-4.58-1.58l-13.69,2.13-.76-4.86,21.1-3.29.72,4.64Z" fill="#f2f2f2" />
                        <path id="Path_695" data-name="Path 695" d="M176.31,374l-4.45.38-.43-4.91,4.46-.38Zm23.84-2-21.28,1.84-.42-4.91,21.28-1.83Z" fill="#f2f2f2" />
                        <path id="Path_696" data-name="Path 696" d="M199.41,361.8l-28.39,1-.17-4.92,28.39-1Z" fill="#f2f2f2" />
                        <path id="Path_697" data-name="Path 697" d="M197.19,343v.08a4.28,4.28,0,0,1,2.66,4.36c-.17,4.16-4,4.87-7.4,4.84l-7.72-.33c-5.85-.36-7.4-2.28-7.34-5.46a4.23,4.23,0,0,1,2.9-4.27v-.08a10.1,10.1,0,0,1-1.9.07l-7.3-.3.21-4.92,28.36,1.19-.2,4.92Zm-11.12-.46c-1.7-.15-4.73-.2-4.83,2.11s1.92,2.16,4,2.4l7.11.3c2.05,0,3.7-.49,3.76-2s-1.22-2.44-3.68-2.54Z" fill="#f2f2f2" />
                        <path id="Path_698 operatePath" className="operatePath" onMouseOver={e => infinityHandleClick(e, 'Operate')} data-name="Path 698" d="M1040.76,430.66l13.12,56.6,63.38-4.31c47.28-79.66,48.36-178.65-1-257.7-2.13-3.42-4.39-6.83-6.74-10.22l-21,68.36-49.75-6.94C1066.64,324.11,1066.59,382.29,1040.76,430.66Z" fill="#4ea0cd" />
                        <path id="Path_699" data-name="Path 699" d="M1106.92,315.61c7.12-1.29,12.5-1.87,14.28,6.43s-3.36,10-10.38,11.72l-4,.85c-7.4,1.59-12.93,2.19-14.76-6.33s3.47-10.23,10.87-11.82Zm-5.41,6.74c-2.29.49-6,1.48-5.23,5s4.62,2.92,7.28,2.35l7.11-1.53c2.22-.48,7.17-1.42,6.35-5.27-.88-4.08-5.66-2.7-7.8-2.24Z" fill="#f2f2f2" />
                        <path id="Path_700" data-name="Path 700" d="M1114.47,344.35v.08a4.08,4.08,0,0,1,3.1,4.07c.15,3.18-1.43,5.11-7.27,5.64l-7.71.54c-3.41.13-7.17-.44-7.46-4.6a4.76,4.76,0,0,1,2.44-4.69v-.07l-9.33.66-.33-4.69,28.44-2,.35,4.91Zm-12.09.85c-2.45.18-3.72,1.07-3.6,2.65s1.76,1.93,3.81,1.9l7.1-.51c2.11-.3,4.13-.21,4-2.52s-3.19-2.16-4.88-2Z" fill="#f2f2f2" />
                        <path id="Path_701" data-name="Path 701" d="M1110.11,359.43c5,0,7.8,2.71,7.58,7.55-.32,6.85-3.9,7.4-9.73,7.14l-2.87-.14.45-9.83-3.1-.14c-2.81-.09-3.38.94-3.45,2.42-.08,1.81,1.22,2.4,3.9,2.45l-.22,4.92c-4.78,0-7.71-2.14-7.48-7.17.26-5.67,3-7.86,9.32-7.45Zm-1,9.81,1.86.09c2.15.06,2.86-.48,3-2.45.11-2.45-1.78-2.43-3.71-2.52h-.87Z" fill="#f2f2f2" />
                        <path id="Path_702" data-name="Path 702" d="M1111.71,384.4v.08a7,7,0,0,1,2.74,2.32,4.26,4.26,0,0,1,.72,3.19l-5.78-.78c.63-2.67.23-4.82-2.87-5.32l-12.23-1.67.67-4.87,21.15,2.88-.64,4.68Z" fill="#f2f2f2" />
                        <path id="Path_703" data-name="Path 703" d="M1091.15,398.82a4.07,4.07,0,0,1,2.21.18v-.07a6.329,6.329,0,0,1-1.57-2.37,4.34,4.34,0,0,1-.19-2.44c.86-3.88,3.2-5.15,7.49-4.19,4.77,1.06,5.16,4.68,5.88,8.79.39,2.23,1.15,3.17,2.94,3.14,1,0,1.29-.72,1.58-2,.48-2.18-.58-2.81-2.47-3.19l1-4.58c4,.84,6.44,2.75,5.1,8.78-1.46,6.54-5,6.18-7.7,5.49l-12.31-2.74a11.28,11.28,0,0,0-3-.24Zm11.13,1.78a40.565,40.565,0,0,0-1.8-4.47,3.28,3.28,0,0,0-2.33-1.37c-1.59-.36-2.77-.12-3.16,1.66-.64,2.84,3.06,3.13,5,3.68Z" fill="#f2f2f2" />
                        <path id="Path_704" data-name="Path 704" d="M1086.78,414.26c.51-2.89,1.43-6.88,5.24-5.74l13.85,4.16.58-1.92,3.45,1-.57,1.89,5.62,1.68-1.43,4.75-5.62-1.68-.6,2-3.44-1,.6-2-12.69-3.81c-.91-.15-1.19,1.19-1.29,1.79Z" fill="#f2f2f2" />
                        <path id="Path_705" data-name="Path 705" d="M1099.25,421.66c4.8,1.55,6.59,5,4.89,9.51-2.41,6.42-6,5.85-11.46,3.8l-2.69-1,3.46-9.22-2.91-1.09c-2.64-.95-3.51-.14-4,1.24-.64,1.7.42,2.67,3,3.54l-1.73,4.61c-4.54-1.5-6.68-4.41-4.92-9.12,2-5.32,5.33-6.54,11.17-4.23Zm-4,9,1.74.65c2,.72,2.87.43,3.56-1.41.87-2.31-.94-2.87-2.75-3.55l-.82-.3Z" fill="#f2f2f2" />
                        <path id="Path_706" className="monitorPath" onMouseOver={e => infinityHandleClick(e, 'Monitor')} data-name="Path 706" d="M1036.61,510.57,1024,456.23c-18.63,23.69-45.51,45.41-84,55.1a154,154,0,0,1-77.44-.27L815.09,536.3l20.5,60.11a241.711,241.711,0,0,0,129.56,2.71c63.92-16.08,107.4-53.32,136.7-93Z" fill="#58bead" />
                        <path id="Path_707" data-name="Path 707" d="M887.33,570.15l-5.3-.27,1.42-28.37,8.44.42,2.18,13.31a63.417,63.417,0,0,1,.66,6.59h.07a63.93,63.93,0,0,1,1.16-6.51l3.5-13,8.39.42-1.41,28.37-5.3-.26.45-8.93c.28-5.64.67-11.27,1.29-16.89h-.07l-7,25.55-3.21-.16-4.27-26.11h-.19c.06,5.65-.11,11.29-.39,16.93Z" fill="#f2f2f2" />
                        <path id="Path_708" data-name="Path 708" d="M912.1,560.93c-.39-7.29-.59-12,6.82-12.42s7.61,4.26,8.08,11.56-.41,10.64-6.77,10.9C913.78,571.46,912.49,568.35,912.1,560.93Zm5.09,2.67c.15,2.61.44,3.73,2.82,3.59s2.39-1.28,2.24-3.89l-.41-7.11c-.12-2-.24-4-2.7-3.9s-2.49,2.2-2.37,4.2Z" fill="#f2f2f2" />
                        <path id="Path_709" data-name="Path 709" d="M935.35,549.69h.07a4.6,4.6,0,0,1,4-3.4c2.77-.42,5.26.85,5.68,4.65l2.47,16.28-4.86.74-2.14-14.07c-.31-2.06-.74-3.38-2.59-3.17s-2.22,2-1.8,4.25l2.08,13.67-4.87.74-3.21-21.12,4.87-.73Z" fill="#f2f2f2" />
                        <path id="Path_710" data-name="Path 710" d="M948.3,542.55l-1-4.35,4.79-1.12,1,4.35Zm5.4,23.3-4.82-20.8,4.79-1.11,4.82,20.8Z" fill="#f2f2f2" />
                        <path id="Path_711" data-name="Path 711" d="M971.32,561.25c-2.7,1.15-6.55,2.55-7.67-1.26l-4.08-13.87-1.93.56-1-3.45,1.89-.55-1.66-5.63,4.76-1.4,1.66,5.63,2-.59,1,3.45-2,.59L968,557.44c.36.84,1.64.35,2.2.1Z" fill="#f2f2f2" />
                        <path id="Path_712" data-name="Path 712" d="M971.88,550.65c-2.62-6.83-4.25-11.23,2.67-13.92s8.55,1.71,11.24,8.51,2.89,10.25-3.08,12.45C976.72,560.15,974.54,557.58,971.88,550.65Zm5.66,1c1,2.43,1.57,3.41,3.79,2.54s1.89-1.95.94-4.38l-2.58-6.64c-.73-1.87-1.47-3.77-3.77-2.88s-1.69,2.85-1,4.72Z" fill="#f2f2f2" />
                        <path id="Path_713" data-name="Path 713" d="M991,534.15h.07a7.181,7.181,0,0,1,.36-3.58,4.27,4.27,0,0,1,2.23-2.39l2.63,5.21c-2.56,1-4.11,2.53-2.77,5.37l5.55,11L994.63,552,985,532.9l4.23-2.13Z" fill="#f2f2f2" />
                        <path id="Path_714" className="planPath" onMouseOver={e => infinityHandleClick(e, 'Plan')} data-name="Path 714" d="M701.64,357.54l34.88,52.24c11.37,23.49,46.9,67.92,97.9,91.22L788.1,525.63,809,587c-84.83-35.17-144.12-108.7-162.61-146.91h-3.06Z" fill="#4ea0cd" />
                        <path id="Path_715" className="planPath2" onMouseOver={e => infinityHandleClick(e, 'Plan')} data-name="Path 715" d="M644.89,284c-1.75-2.76-58.54-91.88-147.7-141.84l-49.75,26.5,19.06,55.76c53.09,33,86.19,85.79,86.19,85.79h-.06l33.93,47.33Z" fill="#4ea0cd" />
                        <path id="Path_716" data-name="Path 716" d="M521.12,230l17.61-22.28,8.5,6.71c4,3.15,2.66,7.32.2,10.44-1.51,1.9-3.7,3.64-6.26,3.65a9.35,9.35,0,0,1-5.72-2.35l-2.8-2.21-7.37,9.33Zm14.12-9.31,2.22,1.76c1.82,1.44,3.64,1.62,5.78-1.08,2-2.55,1.31-3.74-1-5.59l-1.9-1.51Z" fill="#f2f2f2" />
                        <path id="Path_717" data-name="Path 717" d="M537.47,243.17l18.6-21.47,3.72,3.22-18.6,21.47Z" fill="#f2f2f2" />
                        <path id="Path_718" data-name="Path 718" d="M551.87,256.22a4,4,0,0,1,1.29-1.8h0a6.44,6.44,0,0,1-2.84.13,4.51,4.51,0,0,1-2.2-1.1c-2.88-2.74-2.76-5.39.26-8.58,3.37-3.54,6.67-2,10.57-.52,2.11.81,3.31.64,4.21-.91.49-.84,0-1.47-.92-2.39-1.62-1.53-2.7-.94-4,.48l-3.41-3.23c2.76-3,5.68-4.11,10.16.14,4.86,4.61,2.74,7.45.75,9.43L557,257a11.259,11.259,0,0,0-1.76,2.46Zm7.25-8.63c-1.45-.23-3.1-.64-4.76-.76a3.32,3.32,0,0,0-2.38,1.3c-1.12,1.18-1.52,2.32-.2,3.57,2.12,2,4.26-1,5.75-2.43Z" fill="#f2f2f2" />
                        <path id="Path_719" data-name="Path 719" d="M575.58,252.94V253a4.57,4.57,0,0,1,5,1.36c1.91,2.05,2.26,4.82-.64,7.32L568,272.89l-3.35-3.6,10.43-9.7c1.52-1.42,2.37-2.51,1.16-3.92s-2.92-.7-4.53.91L561.54,266l-3.35-3.61,15.64-14.54,3.36,3.6Z" fill="#f2f2f2" />
                        <image id="Rectangle_81" data-name="Rectangle 81" width="345" height="210" transform="translate(157 420)" xlinkHref="data:image/png;base64,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" />
                        <path id="Path_720 testPath" className="testPath" onMouseOver={e => infinityHandleClick(e, 'Test')} data-name="Path 720" d="M474.52,538.51,419,507.42a156.94,156.94,0,0,1-70.44-1.71C307.94,495.49,280,472.13,261,447l-15.28,58.79L184.88,500c29.88,40.59,74.28,78.73,139.65,95.19A246.341,246.341,0,0,0,454.58,593Z" fill="#58bead" />
                        <path id="Path_721" data-name="Path 721" d="M308.85,522.26l16.61,7-1.65,3.91-5.8-2.44-9.6,22.76-5-2.1,9.6-22.76-5.83-2.46Z" fill="#f2f2f2" />
                        <path id="Path_722" data-name="Path 722" d="M319.74,542.72c1.44-4.93,4.88-6.86,9.55-5.26,6.62,2.27,6.13,5.94,4.21,11.56l-1,2.78-9.49-3.25-1,3c-.89,2.72,0,3.58,1.38,4.07,1.76.6,2.71-.51,3.52-3.12l4.75,1.62c-1.4,4.67-4.3,6.94-9.15,5.27-5.48-1.87-6.82-5.23-4.63-11.26Zm9.31,3.8.61-1.79c.68-2.09.36-2.94-1.54-3.59-2.38-.81-2.89,1.05-3.53,2.91l-.29.84Z" fill="#f2f2f2" />
                        <path id="Path_723" data-name="Path 723" d="M340.42,556.73c-1.36,3.8.16,4.06,1.28,4.35a1.94,1.94,0,0,0,2.62-1.84c.23-1.22-1-2.24-1.75-3.12l-2.19-2.51c-2-2.3-3.08-4.65-2.31-7.68.83-3.25,3.89-4.46,8.56-3.27s6.26,4.22,5,8.72l-4.86-1.24c.71-2.33.27-3.4-1.42-3.83-1.16-.29-2.19,0-2.49,1.2s.44,2,1.21,2.9l3.28,3.7c1.06,1,2.49,3.54,2.27,5-.52,3.77-2.39,7.36-9.12,5.64-2.58-.65-7.13-3-4.93-9.26Z" fill="#f2f2f2" />
                        <path id="Path_724" data-name="Path 724" d="M360,568.39c-3-.2-7.14-.69-6.4-4.68l2.69-14.51-2-.37.67-3.61,2,.37L358,539.7l5,.93-1.09,5.88,2.08.39-.66,3.61-2.09-.39-2.47,13.29c-.05.93,1.33,1.07,2,1.11Z" fill="#f2f2f2" />
                        <path id="Path_732 deployPath" className="deployPath" onMouseOver={e => infinityHandleClick(e, 'Deploy')} data-name="Path 732" d="M856,207.53c27-9.87,57.37-12.95,90.07-2.82,33.55,10.4,57.54,27.57,74.72,46.93l52.12,7.27,20-65.15c-27-30.92-64.93-58.39-118.31-74.93-59.28-18.37-113.76-9-160.64,12.45l56.78,27.89Z" fill="#58bead" />
                        <path id="Path_733" data-name="Path 733" d="M925.39,142.23a27.351,27.351,0,0,1,6.13.47c3.85.68,6.36,2.06,8,4.21,2.21,2.82,2.86,7.09,1.81,13-1.08,6.16-3.45,10.27-6.53,12.16-2.39,1.63-5.6,2.05-9.85,1.29a41.519,41.519,0,0,1-4.84-1.18Zm1.46,26.41a3.641,3.641,0,0,0,1,.27c2.86.51,5.85-1.86,7.33-10.29,1.11-6.25.15-10.34-3.43-11a3.28,3.28,0,0,0-1.2-.07Z" fill="#f2f2f2" />
                        <path id="Path_734" data-name="Path 734" d="M948.28,168.62c-.77,3.41.88,5.15,3.47,5.8a13.43,13.43,0,0,0,4.33.34l-.26,4.39a18.41,18.41,0,0,1-6.27-.54c-5.93-1.49-8.2-6.24-6.48-13.06,1.85-7.31,6.74-10.73,11.69-9.48,4.68,1.18,6.47,5.56,4.81,12.17a15.734,15.734,0,0,1-.94,3Zm6.25-2.79c.71-2.81.55-5.18-1.19-5.61-1.92-.49-3.39,2.13-4,4.3Z" fill="#f2f2f2" />
                        <path id="Path_735" data-name="Path 735" d="M964.09,166.29c.85-2.58,1.48-4.79,2.06-6.83l5,1.64-.5,2.54h.09a5.11,5.11,0,0,1,5.37-1.33c4.72,1.55,5,7.3,3,13.2-2.5,7.6-7,10-10.58,8.77a4.38,4.38,0,0,1-2.85-3.26h-.09l-3.33,10.14-5.73-1.89Zm3.5,8.65a4.76,4.76,0,0,0-.3,1.94c0,1.46.64,2.05,1.29,2.26,2,.67,3.69-2.08,4.8-5.44,1.33-4.06,1.09-6.57-.62-7.13a2.33,2.33,0,0,0-2.52,1.21,3.841,3.841,0,0,0-.77,1.44Z" fill="#f2f2f2" />
                        <path id="Path_736" data-name="Path 736" d="M990,157.8l5.6,2.22-11.69,29.6-5.61-2.21Z" fill="#f2f2f2" />
                        <path id="Path_737" data-name="Path 737" d="M1007.2,187.7c-4,8.5-9.65,8.39-12.74,7-4.87-2.28-6-7.47-2.91-14.1,3.43-7.34,8.78-8.8,12.82-6.91C1009.17,175.88,1010.2,181.28,1007.2,187.7ZM997,183c-1.64,3.5-2.45,6.67-.5,7.59,1.76.82,3.81-2.39,5.21-5.39,1.3-2.79,2.5-6.55.67-7.4C1000.4,176.81,998.33,180.16,997,183Z" fill="#f2f2f2" />
                        <path id="Path_738" data-name="Path 738" d="M1019.63,181.83l-3.86,11.25c-.45,1.27-.91,2.44-1.34,3.57h.08c.73-.91,1.53-1.94,2.3-2.93l7.46-9.3,5.12,2.91-12.57,12.8c-3.06,3.13-6.5,6.2-10.05,7.51a12,12,0,0,1-6.19.56l1-5.43a9.23,9.23,0,0,0,3.53-.16,7.93,7.93,0,0,0,3-1.39,2.352,2.352,0,0,0,.76-.68,2.641,2.641,0,0,0,.25-.81l5-21.16Z" fill="#f2f2f2" />
                    </g>
                </svg>
                {infinityDescriptionShow && (
                    <div className="infinityDesc">
                        <span>{infinityDescriptionTitle}</span>
                        <div>
                            {infinityDescriptionText}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};