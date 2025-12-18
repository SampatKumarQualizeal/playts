import * as reader from 'xlsx';
import path from 'path';
import { faker } from '@faker-js/faker';

class dataHandling {

    async readSingleRowtestdataFromExcel(strFileName: string, strSheetName: string, strTestCaseName: string): Promise<any> {
        try {

            let filePath = path.resolve('src');

            filePath = path.join(filePath, 'test_data', strFileName);

            const file = reader.readFile(filePath as any);

            const sheet = (file as any).Sheets[strSheetName];

            let temp1: any[] = [];

            temp1 = reader.utils.sheet_to_json(sheet).filter((item: any) => item.TestCaseName === strTestCaseName)

            return temp1[0];
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async readMulRowsTestdataFromExcel(strFileName: string, strSheetName: string, strTestCaseName: string): Promise<any[]> {
        try {

            let filePath = path.resolve('src');

            filePath = path.join(filePath, 'test_data', strFileName);

            console.log(filePath)

            const file = reader.readFile(filePath as any);

            const sheet = (file as any).Sheets[strSheetName]

            let temp1: any[] = []

            temp1 = reader.utils.sheet_to_json(sheet).filter((item: any) => item.TestCaseName === strTestCaseName)

            return temp1
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    getData(fieldName: string): Record<string, any> {
        if (fieldName == "Company") {
            return {
                Name: faker.company.name(),
                URL: faker.internet.url(),
                StreetAddress: (faker.location as any).street(),
                City: (faker.location as any).city(),
                SateNCountry: (faker.location as any).state({ abbreviated: false }),
                AddressCountry: faker.helpers.arrayElement(['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua & Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia & Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo - Brazzaville', 'Congo - Kinshasa', 'Cook Islands', 'Costa Rica', 'Côte d’Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong SAR China', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo, Republic of', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau SAR China', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar (Burma)', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'North Korea', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territories', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Samoa', 'San Marino', 'São Tomé & Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia & South Sandwich Islands', 'South Korea', 'Spain', 'Sri Lanka', 'St. Helena', 'St. Kitts & Nevis', 'St. Lucia', 'St. Pierre & Miquelon', 'St. Vincent & Grenadines', 'Sudan', 'Suriname', 'Svalbard & Jan Mayen', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', "Trinidad & Tobago", 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks & Caicos Islands', 'Tuvalu', 'U.S. Outlying Islands', 'U.S. Virgin Islands', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Wallis & Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe']),
                PostCode: (faker.location as any).zipCode(),
                Phone: (faker.location as any).country(),
                Number: faker.phone.number(),
                PhoneType: faker.finance.transactionType(),
                Email: faker.internet.email(),
                EmailType: faker.helpers.arrayElement(['Personal email', 'Business']),
                Tags: faker.lorem.word(),
                Description: faker.lorem.paragraph(),
                Industry: faker.company.name(),
                NoOfEmp: faker.number.int({ min: 1000000 }).toString(), // Adjust max number as needed
                StockSymbol: faker.lorem.word(),
                AnnualRevenue: faker.number.int({ min: 10000, max: 1000000 }).toString(), // Adjust range as needed
                Priority: faker.helpers.arrayElement(['High', 'Medium', 'Low']),
                Status: faker.helpers.arrayElement(['New', 'Active', 'Inactive', 'On Hold', 'Terminated', 'Hot']),
                Category: faker.helpers.arrayElement(['Client', 'Partner', 'Prospect']),
                Source: faker.helpers.arrayElement(['Ad', 'Referral', 'Customer', 'Partner', 'Event', 'Internet', 'Walk in', 'Call in', 'Email', 'Web Service', 'Import']),
                VATNumber: faker.number.int({ min: 100000000, max: 9999999999 }).toString(),
                Identifier: faker.lorem.word(),
            };
        }
        return {};
    }

}
export default dataHandling;
