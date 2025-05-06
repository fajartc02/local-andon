const STATE_TYPE_JOB = {
    containers: [{
            label: 'Preventive',
            options: [
                { value: 'SE Activity', text: 'SE Activity' },
                { value: 'Critical M/C C/M', text: 'Critical M/C C/M' },
                { value: 'Yokoten', text: 'Yokoten' },
                { value: 'Improvement', text: 'Improvement' },
                { value: 'TPM', text: 'TPM' },
                { value: 'RED TAG', text: 'RED TAG' },
                { value: 'C/M Temuan TPM', text: 'C/M Temuan TPM' },
                { value: 'C/M Potensi B/down', text: 'C/M Potensi B/down' },
                { value: 'Trainer OM', text: 'Trainer OM' },
            ]
        },
        { value: 'Training', text: 'Training' },
        { value: 'Repair', text: 'Repair' },
        { value: 'Safety', text: 'Safety' },
        { value: 'Project', text: 'Project' },
        {
            label: 'Others',
            options: [
                { value: '4S', text: '4S' },
                { value: 'Admin', text: 'Admin' },
                { value: 'Meeting', text: 'Meeting' },
                { value: 'Investigasi Problem', text: 'Investigasi Problem' },
            ]
        },
    ]
}

const STATE_GROUP = {
    container: [{
            type: 'SE Activity',
            group: 'Preventive',
            bgCol: '#C8FFDB'
        },
        {
            type: 'Critical M/C C/M',
            group: 'Preventive',
            bgCol: '#C8FFDB'
        },
        {
            type: 'Yokoten',
            group: 'Preventive',
            bgCol: '#C8FFDB'
        },
        {
            type: 'Improvement',
            group: 'Preventive',
            bgCol: '#C8FFDB'

        },
        {
            type: 'TPM',
            group: 'Preventive',
            bgCol: '#fff600'
        },
        {
            type: 'RED TAG',
            group: 'Others',
            bgCol: '#c2eae3'
        },
        {
            type: 'C/M Temuan TPM',
            group: 'Preventive',
            bgCol: '#fff600'
        },
        {
            type: 'C/M Potensi B/down',
            group: 'Preventive',
            bgCol: '#C8FFDB'
        },
        {
            type: 'Trainer OM',
            group: 'Preventive',
            bgCol: '#C8FFDB'
        },
        { type: 'Training', group: 'Training', bgCol: '#C8FFDB' },
        { type: 'Repair', group: 'Repair', bgCol: '#FC3232' },
        { type: 'Safety', group: 'Safety', bgCol: '#44A239' },
        { type: 'Project', group: 'Project', bgCol: '#96ffeb' },
        { type: '4S', group: 'Others', bgCol: '#c2eae3' },
        { type: 'Admin', group: 'Others', bgCol: '#c2eae3' },
        { type: 'Meeting', group: 'Others', bgCol: '#c2eae3' },
        { type: 'Investigasi Problem', group: 'Others', bgCol: '#c2eae3' },
    ]
}
const STATE_GROUP_FIX = {
    container: [{
            type: 'Preventive',
            group: 'Preventive',
            bgCol: '#0fdb04'
        },
        { type: 'Repair', group: 'Repair', bgCol: '#FC3232' },
        // { type: 'Training', group: 'Training', bgCol: '#C8FFDB' },
        { type: 'Safety', group: 'Safety', bgCol: '#44A239' },
        { type: 'Project', group: 'Project', bgCol: '#96ffeb' },
        { type: 'Others', group: 'Others', bgCol: '#c2eae3' },
    ]
}
const STATE_LINES = {
    containers: [{
            name: "LPDC",
            dataProblem: [
                [],
                []
            ],
            member: []
        },
        {
            name: "HPDC",
            dataProblem: [
                [],
                []
            ],
            member: []
        },
        {
            name: "CAM SHAFT",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CRANK SHAFT",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CYLINDER HEAD",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CYLINDER BLOCK",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "ASSY LINE",
            dataProblem: [
                [],
                []
            ],
        },
    ],
    oee: [{
            name: "LPDC",
            foee: null,
            factual: null,
            fplan: null
        },
        {
            name: "HPDC",
            foee: null,
            factual: null,
            fplan: null
        },
        {
            name: "CAM SHAFT",
            foee: null,
            factual: null,
            fplan: null
        },
        {
            name: "CRANK SHAFT",
            foee: null,
            factual: null,
            fplan: null
        },
        {
            name: "CYLINDER HEAD",
            foee: null,
            factual: null,
            fplan: null
        },
        {
            name: "CYLINDER BLOCK",
            foee: null,
            factual: null,
            fplan: null
        },
        {
            name: "ASSY LINE",
            foee: null,
            factual: null,
            fplan: null
        },
    ],
    opts: [
        "ASSY LINE",
        "CRANK SHAFT",
        "CAM SHAFT",
        "CYLINDER HEAD",
        "CYLINDER BLOCK",
        "HPDC",
        "LPDC",
    ]
}

const STATE_TEMP_JOB = {
    containers: [{
            name: "ASSY LINE",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CRANK SHAFT",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CAM SHAFT",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CYLINDER BLOCK",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CYLINDER HEAD",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "LPDC",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "HPDC",
            dataProblem: [
                [],
                []
            ],
        },
    ],
}

const STATE_BLANK_JOB = {
    containers: [{
            name: "ASSY LINE",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CRANK SHAFT",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CAM SHAFT",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CYLINDER BLOCK",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "CYLINDER HEAD",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "LPDC",
            dataProblem: [
                [],
                []
            ],
        },
        {
            name: "HPDC",
            dataProblem: [
                [],
                []
            ],
        },
    ],
}

// [{ "name": "Preventive", "data": [1, 2, 3, 1, 2, 3, 2] }, { "name": "Training", "data": [1, 2, 3, 1, 2, 3, 2] }, { "name": "Repair", "data": [1, 2, 3, 1, 2, 3, 2] }, { "name": "Safety", "data": [1, 2, 3, 1, 2, 3, 2] }, { "name": "Project", "data": [1, 2, 3, 1, 2, 3, 2] }, { "name": "Others", "data": [1, 2, 3, 1, 2, 3, 2] }]


export {
    STATE_TYPE_JOB,
    STATE_LINES,
    STATE_TEMP_JOB,
    STATE_BLANK_JOB,
    STATE_GROUP,
    STATE_GROUP_FIX
}