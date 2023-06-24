import Vue from 'vue'
import VueRouter from 'vue-router'
// import Dashboard from '../views/Dashboard';

import DashboardOld from '../views/DashboardOld';
import DashboardNew from '../views/NewDashboard/OpDashboard';

import ProblemHistory from '../views/ProblemHistory'
import EditProblem from '../views/EditProblem'
import PdfViewer from '../views/PdfViewer'
import Henkaten from '../views/Henkaten'
import PdfViewerSmallProb from '../views/PdfViewerSmallProb'
import PdfViewerLongProb from '../views/PdfViewerLongProb'
import RealtimePareto from '../views/RealtimePareto'
import RealtimeParetoDesktop from '../views/RealtimeParetoDesktop'
import RegisterNewMachine from '../views/RegisterNewMachine'
import DetailsLine from '../views/DetailsLine'
import SymptompMgmt from '../views/SymptompMgmt'
import SymptompDesktop from '../views/SymptompDesktop'
import TpmMonitoring from "../views/TpmMonitoring";
import LedgerTpm from "../views/LedgerTpm";
import CmFollowup from "../views/CmFollowup";
import CycleTimeMachines from "../views/CycleTimeMachines"
import Login from "../views/Login"
import Register from "../views/Register"
import QcMonitoring from "../views/QcMonitoring"
import QcMonitoringDetails from "../views/QcMonitoringDetails"
import SummaryWeekly from "../views/SummaryWeekly"
import MappingLine from "../views/Mapping/MappingLine"
import ManualBook from "../views/ManualInstruction/DashboardMI"
import DashboardMc from "../views/Machines/DashboardMc"
import MtbfMttr from "../views/MtbfMttr/MtbfMttr"


Vue.use(VueRouter)

const routes = [{
        path: '/login',
        // name: 'Login',
        component: Login
    }, {
        path: '/register',
        name: 'Register',
        component: Register
    },
    // {
    //     path: '/',
    //     name: 'Dashboard',
    //     component: DashboardOld
    // },
    {
        path: '/',
        redirect: '/',
        component: () =>
            import ('@/views/Home.vue'),
        children: [{
                path: '/',
                name: 'DashboarOld',
                component: DashboardOld
            },
            {
                path: '/dashboard',
                name: 'DashboarNew',
                component: DashboardNew
            },
            {
                path: '/monitoring',
                name: 'DashboarMc',
                component: DashboardMc
            },
            {
                path: '/MappingLine',
                name: 'MappingLine',
                component: MappingLine
            },
            {
                path: '/detailsLine',
                name: 'DetailsLine',
                component: DetailsLine,
                props: true
            },
            {
                path: '/problemHistory',
                name: 'ProblemHistory',
                component: ProblemHistory
            },
            {
                path: '/tpmMonitoring',
                name: 'TpmMonitoring',
                component: TpmMonitoring,
            },
            {
                path: '/tpmMonitoring/ledger',
                name: 'Ledger',
                component: LedgerTpm
            },
            {
                path: '/symptompMgmt',
                name: 'SymptompMgmt',
                component: SymptompMgmt
            },
            {
                path: '/symptompDesktop',
                name: 'SymptompDesktop',
                component: SymptompDesktop
            },
            {
                path: '/cmFollowup',
                name: 'CmFollowup',
                component: CmFollowup
            },
            {
                path: '/realtimePareto',
                name: 'RealtimePareto',
                component: RealtimePareto
            },
            {
                path: '/realtimeParetoDesktop',
                name: 'RealtimeParetoDesktop',
                component: RealtimeParetoDesktop
            },
            {
                path: '/editProblem',
                name: 'EditProblem',
                component: EditProblem
            },
            {
                path: '/registerNewMachine',
                name: 'RegisterNewMachine',
                component: RegisterNewMachine
            },
            {
                path: '/pdfViewer',
                name: 'PdfViewer',
                component: PdfViewer
            },
            {
                path: '/pdfViewerSmall',
                name: 'PdfViewerSmallProb',
                component: PdfViewerSmallProb
            },
            {
                path: '/pdfViewerLong',
                name: 'PdfViewerLongProb',
                component: PdfViewerLongProb
            },
            {
                path: '/henkaten',
                name: 'Henkaten',
                component: Henkaten
            },
            {
                path: '/cycleTimeMachine',
                name: 'CycleTimeMachines',
                component: CycleTimeMachines
            },
            {
                path: '/qcMonitoring',
                name: 'QcMonitoring',
                component: QcMonitoring,
            },
            {
                path: '/qcMonitoring/details',
                name: 'CycleTimeMachines',
                component: QcMonitoringDetails
            },
            {
                path: '/summaryWeekly',
                name: 'SummaryWeekly',
                component: SummaryWeekly
            },
            {
                path: '/manualBook',
                name: 'DashboardMI',
                component: ManualBook
            },
            {
                path: '/symptom',
                name: 'Symptom',
                redirect: '/symptom/parameter',
                component: () =>
                    import ('@/views/Symptom/Symptom.vue'),
                children: [{
                    path: 'parameter',
                    name: 'SymptomParameter',
                    component: () =>
                        import ('@/views/Symptom/SymptomParameter.vue'),

                }, {
                    path: 'parameter/dashboard',
                    name: 'SymptomParameterDashboard',
                    component: () =>
                        import ('@/views/Symptom/SymptomParameterDashboard.vue')
                }]
            },
            {
                path: '/parameter',
                name: 'Parameter',
                redirect: '/parameter/dashboard',
                component: () =>
                    import ('@/views/Parameter/Parameter.vue'),
                children: [{
                    path: 'dashboard',
                    name: 'DashboardParam',
                    component: () =>
                        import ('@/views/Parameter/Dashboard.vue'),
                }, {
                    path: 'administration',
                    name: 'AdministrationParam',
                    component: () =>
                        import ('@/views/Parameter/AdministrationParam.vue'),
                }, {
                    path: 'details',
                    name: 'DetailParameter',
                    component: () =>
                        import ('@/views/Parameter/DetailParameter.vue'),
                }, {
                    path: 'history',
                    name: 'ParameterHistory',
                    component: () =>
                        import ('@/views/Parameter/ParameterHistory.vue'),
                }, {
                    path: 'realtime',
                    name: 'RealtimeParameter',
                    component: () =>
                        import ('@/views/Parameter/RealtimeParameter.vue'),
                }]
            },
            {
                path: '/totalProblem',
                name: 'TotalProblem',
                redirect: '/totalProblem/dashboard',
                component: () =>
                    import ('@/views/TotalProblem/TotalProblem.vue'),
                children: [{
                    path: 'dashboard',
                    name: 'DashboardTotalProblem',
                    component: () =>
                        import ('@/views/TotalProblem/Dashboard.vue'),
                }]
            },
            {
                path: '/oee',
                name: 'OeeSummary',
                redirect: '/oee/dashboard',
                component: () =>
                    import ('@/views/OeeSummary/OeeSummary.vue'),
                children: [{
                    path: 'dashboard',
                    name: 'DashboardOee',
                    component: () =>
                        import ('@/views/OeeSummary/DashboardOee.vue')
                }]
            },
            {
                path: '/focus-theme',
                name: 'FocusTheme',
                redirect: '/focus-theme/member',
                component: () =>
                    import ('@/views/FocusTheme/FocusTheme'),
                children: [{
                    path: 'member',
                    name: 'DashboardFocusTheme',
                    component: () =>
                        import ('@/views/FocusTheme/DashboardFocusTheme')
                }, {
                    path: 'taskforce',
                    name: 'DashboardTaskForce',
                    component: () =>
                        import ('@/views/FocusTheme/DashboardTaskForce')
                }]
            },
            {
                path: '/quality',
                name: 'Quality',
                redirect: '/quality/dashboard',
                component: () =>
                    import ('@/views/Quality/Quality.vue'),
                children: [{
                    path: 'dashboard',
                    name: 'DashboardQuality',
                    component: () =>
                        import ('@/views/Quality/Dashboard.vue'),
                }, {
                    path: 'detailProblem',
                    name: 'DetailQualityProblem',
                    component: () =>
                        import ('@/views/Quality/DetailQualityProblem.vue'),
                }, {
                    path: 'editQuality',
                    name: 'EditQuality',
                    component: () =>
                        import ('@/views/Quality/EditQuality'),
                }]
            },
            {
                path: '/job',
                name: 'Job',
                redirect: '/job/dashboard',
                component: () =>
                    import ('@/views/Job/Job'),
                children: [{
                    path: 'dashboard',
                    component: () =>
                        import ('@/views/Job/DashboardJob')
                }, {
                    path: 'dashboardA',
                    component: () =>
                        import ('@/views/Job/DashboardJobAudit')
                }, {
                    path: 'yamazumi',
                    component: () =>
                        import ('@/views/Job/YamazumiGraph')
                }, {
                    path: 'details',
                    component: () =>
                        import ('@/views/Job/DetailsJobMember')
                }]
            },
            {
                path: '/mtbf-mttr',
                name: 'MtbfMttr',
                component: MtbfMttr,
            },

        ]
    },
    {
        path: '/tps',
        name: 'Tps',
        redirect: '/tps/dashboard',
        component: () =>
            import ('@/views/Tps/Tps.vue'),
        children: [{
            path: 'dashboard',
            name: 'DashboardTps',
            component: () =>
                import ('@/views/Tps/DashboardTps.vue'),
        }, {
            path: 'detail-data',
            name: 'DetailDataTps',
            component: () =>
                import ('@/views/Tps/DetailDataTps.vue'),
        }]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router