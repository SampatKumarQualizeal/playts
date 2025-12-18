import { execSync } from 'child_process';

export const URL: string = process.env.URL + '';
export const UserName: string = process.env.USERNAME + '';
export const PassWord: string = process.env.PASSWORD + '';
export const waitStatedomcontentloaded: string = 'domcontentloaded';
export const waitStatenetworkidle: string = 'networkidle';
export const waitStateLoad: string = 'load';
export const SHORT_TIMEOUT: number = 5;
export const MEDIUM_TIMEOUT: number = 20;
export const LONG_TIMEOUT: number = 45;
export const NavHome: string = 'Home';
export const NavCalendar: string = 'Calendar';
export const NavCompanies: string = 'Companies';
export const NavContacts: string = 'Contacts';
export const NavDeals: string = 'Deals';
export const NavTasks: string = 'Tasks';
export const NavCases: string = 'Cases';
export const NavCalls: string = 'Calls';
export const NavDocuments: string = 'Documents';
export const NavEmail: string = 'Email';
export const NavCampaigns: string = 'Campaigns';
export const NavForms: string = 'Forms';
export const NavReports: string = 'Reports';
export const operationViewType: string = "view";
export const operationEditType: string = "edit";
export const operationDeleteType: string = "delete";
export const operationcallType: string = "call";
export const operationcheckType: string = "check";

const playwrightClientVersion: string = execSync('npx playwright --version').toString().trim().split(' ')[1];

// LambdaTest capabilities
const capabilities: Record<string, any> = {
  'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  'browserVersion': 'latest',
  'LT:Options': {
    'platform': 'Windows 10',
    'build': 'Playwright JS Build',
    'name': 'Playwright Test',
    'user': process.env.LT_USERNAME,
    'accessKey': process.env.LT_ACCESS_KEY,
    'network': true,
    'video': true,
    'console': true,
    'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
    'tunnelName': '', // Optional
    'geoLocation': '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
    'playwrightClientVersion': playwrightClientVersion
  }
}

export default capabilities;
