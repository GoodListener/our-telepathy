import { makeStyles } from '@material-ui/core';
import React from 'react';
import Line from './Line';

export default function LineProgress({className, timeline}) {
    return (
        <div className={className}>
            {timeline.map((line, idx) => <Line key={idx} line={line}></Line>)}
        </div>
    )
}