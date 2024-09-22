import { PermissionsAndroid, Alert } from "react-native";

import RNFS from "react-native-fs";

import uuid from "react-native-uuid";
import { IOrder } from "./redux.constants";
import { toPascalCase } from "../products.config";
export const genetateUUID = () => {
  return uuid.v4().toString();
};

export const Category = {
  Agriculture: "Agri",
  CPVCPro: "CPVC",
  FoamCore: "Foam",
  DrainPro: "Drain",
};

export const LargeCategoryName = {
  Agriculture: "Agriculture",
  CPVC: "CPVC",
  CPVCPro: "CPVC Pro",
  DrainMaster: "Drain Master",
  DrainPro: "Drain Pro",
  UPVC: "UPVC",
  Silencio: "Silencio",
  FoamCore: "Foam Core",
  Drex: "Drex",
};

export const UppercaseLargeCategoryName = {
  AGRICULTURE: "Agriculture",
  CPVC: "CPVC",
  CPVCPRO: "CPVC Pro",
  DRAINMASTER: "Drain Master",
  DRAINPRO: "Drain Pro",
  UPVC: "UPVC",
  SILENCIO: "Silencio",
  FOAMCORE: "Foam Core",
  DREX: "Drex",
};

export const getCategoryEnumValueByString = (
  stringValue: string
): string | undefined => {
  const enumKey = Object.keys(Category).find(
    (key) => Category[key as keyof typeof Category] === stringValue
  );

  return enumKey ? Category[enumKey as keyof typeof Category] : undefined;
};

export const getCategoryLargeEnumValueByString = (
  stringValue: string
): string | undefined => {
  const enumKey = Object.keys(LargeCategoryName).find(
    (key) => LargeCategoryName[key as keyof typeof Category] === stringValue
  );

  return enumKey
    ? LargeCategoryName[enumKey as keyof typeof LargeCategoryName]
    : undefined;
};

export const filterArrayByString = (data: any[], search: string): any[] => {
  if (search.length < 3) return data;

  return data.filter((item) =>
    item?.title?.toLowerCase().includes(search.toLowerCase())
  );
};

export const parseBillingAddress = (address: string) => {
  try {
    return JSON.parse(address);
  } catch (error) {
    // console.error('Failed to parse billing address:', error);
    return {};
  }
};

export const COMPANY_DETAILS = {
  name: "Kedia Polymer",
  address:
    "25 Strand Road, Marshall House, 2nd Floor R.N. - 201 & 202, Kolkata - 700 001",
  phone: "2213-7428/7429/7430",
  email: "vipul@kediapipes.com",
  website: "www.kediapipes.com",
  bankDetails: {
    bankName: "KEDIA POLYMER, ICICI BANK , NS Road Branch",
    accountNumber: "695205600075",
    ifscCode: "ICIC0006952",
  },
};

// Function to convert number to words
export const convertNumberToWords: any = (amount: number) => {
  const units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  if (amount < 20) return units[amount];
  if (amount < 100)
    return (
      tens[Math.floor(amount / 10)] +
      (amount % 10 ? " " + units[amount % 10] : "")
    );
  if (amount < 1000)
    return (
      units[Math.floor(amount / 100)] +
      " Hundred " +
      (amount % 100 ? convertNumberToWords(amount % 100) : "")
    );
  if (amount < 100000)
    return (
      convertNumberToWords(Math.floor(amount / 1000)) +
      " Thousand " +
      (amount % 1000 ? convertNumberToWords(amount % 1000) : "")
    );
  if (amount < 10000000)
    return (
      convertNumberToWords(Math.floor(amount / 100000)) +
      " Lakh " +
      (amount % 100000 ? convertNumberToWords(amount % 100000) : "")
    );
  return (
    convertNumberToWords(Math.floor(amount / 10000000)) +
    " Crore " +
    (amount % 10000000 ? convertNumberToWords(amount % 10000000) : "")
  );
};

export const formatAddress = (address: any) => {
  if (!address) return "";
  const parsedAddress = JSON.parse(address);
  //(parsedAddress?.phone, parsedAddress.phone);
  if (
    parsedAddress?.name &&
    parsedAddress?.phone &&
    parsedAddress?.addressline1 &&
    parsedAddress?.addressline2 &&
    parsedAddress?.city &&
    parsedAddress?.pincode &&
    parsedAddress?.state
  )
    return `
       ${parsedAddress.name || ""}<br>
      ${parsedAddress.phone || ""}<br>
      ${parsedAddress.addressline1 || ""}
      ${parsedAddress.addressline2 || ""}
      ${parsedAddress.city || ""}, ${parsedAddress.state || ""} - ${
      parsedAddress.pincode || ""
    }
    `;
};

export const formatAddressSingleLine = (address: any) => {
  if (!address) return "";

  const parsedAddress = JSON.parse(address);

  // Check if there's only name and phone or any one of these, return empty string
  if (
    !parsedAddress.addressline1 &&
    !parsedAddress.addressline2 &&
    !parsedAddress.city &&
    !parsedAddress.pincode &&
    !parsedAddress.state
  ) {
    return "";
  }

  // Collect all address parts that are not empty
  const parts = [
    parsedAddress.name,
    parsedAddress.phone,
    parsedAddress.addressline1,
    parsedAddress.addressline2,
    parsedAddress.city,
    parsedAddress.state,
    parsedAddress.pincode,
  ].filter((part) => part && part.trim() !== "");

  // Join the parts with a comma and space
  return parts.join(", ");
};

export const formatDate = (date: string | undefined) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function formatCurrentDateTime(): string {
  const date = new Date();

  // Get day of the month
  const day = date.getDate();

  // Get ordinal suffix for the day
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const dayWithSuffix = day + getOrdinalSuffix(day);

  // Get month name
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];

  // Get last two digits of the year
  const year = date.getFullYear().toString().slice(-2);

  // Get hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format the time string
  const time = `${hours}:${minutes} ${ampm}`;

  return `${dayWithSuffix} ${month}, ${year}, ${time}`;
}

export const fRequestAndroidPermission = async () => {
  // Refer to https://reactnative.dev/docs/permissionsandroid for further details on permsissions
  try {
    const grantedOne = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Kedia Polymer Permission Request",
        message:
          "Kedia Polymer needs access to your storage so you can save files to your device.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );

    const grantedTwo = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Kedia Polymer Permission Request",
        message:
          "Kedia Polymer needs access to your storage so you can save files to your device.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );

    if (
      grantedOne === PermissionsAndroid.RESULTS.GRANTED &&
      grantedTwo === PermissionsAndroid.RESULTS.GRANTED
    ) {
      //('permission is granted');
      return true;
    } else {
      //('permission denied');
      return false;
    }
  } catch (err) {
    console.error("fRequestAndroidPermission error:", err);
    return false;
  }
};

export const getHTMLForInVoice = (
  currentOrder: IOrder,
  roundedTotalAmount: number,
  amountInWords: string,
  phoneNumber: string,
  showPrintButton?: boolean // Optional parameter
) => {
  return `<html>
  <head>
    <style>
      body {
        font-family: 'Helvetica';
        font-size: 12px;
        margin: 0;
        padding: 20px;
        box-sizing: border-box;
      }
      header, footer {
        height: 50px;
        background-color: #fff;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
      }
      header img {
        height: 100%;
        margin-right: 20px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        background-color: #fff;
        margin-bottom: 20px;
      }
      th, td {
        border: 1px solid #000;
        padding: 5px;
      }
      th {
        background-color: #ccc;
      }
      .page {
        page-break-after: always;
        position: relative;
        margin-top: 10px;
      }
      .page:last-child {
        page-break-after: auto;
      }
      .page::after {
        content: counter(page);
        position: absolute;
        bottom: 10px;
        right: 20px;
        font-size: 10px;
      }
      .footer-text {
        font-size: 10px;
        text-align: right;
      }
      .print-button {
        display: block;
        margin: 20px auto;
        padding: 10px 20px;
        font-size: 14px;
        color: white;
        background-color: #007BFF;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
      }
      .print-button:hover {
        background-color: #0056b3;
      }
    </style>
    <script>
      function printPage() {
        window.print();
      }
    </script>
  </head>
  <body>
    
      <div>
        <img src="https://tiimg.tistatic.com/images/l/1/logo_97408.jpg" alt="Company Logo">
        <div style="text-align: center; padding: 5px; ">
        <h3>${COMPANY_DETAILS.name}</h3>
        <p>${COMPANY_DETAILS.address}</p>
        <p>Phone: ${COMPANY_DETAILS.phone}</p>
        <p>Email: ${COMPANY_DETAILS.email}</p>
        <p>Website: <a href="${COMPANY_DETAILS.website}">${
    COMPANY_DETAILS.website
  }</a></p>
        <h3>Payment details:</h3>
        <p>Bank name: ${COMPANY_DETAILS.bankDetails.bankName}</p>
        <p>Account Number: ${COMPANY_DETAILS.bankDetails.accountNumber}</p>
        <p>IFSC Code: ${COMPANY_DETAILS.bankDetails.ifscCode}</p>
        <p>Order Placed By: ${currentOrder?.createdByName}</p>
        <p>Phone Number: ${phoneNumber}</p>
      </div>
      </div>
      
   
    <h1>Invoice for Order #${currentOrder?.orderNumber}</h1>
    <h2>Customer Name: ${currentOrder?.customerName}</h2>
    ${
      formatAddress(currentOrder?.billingAddress)
        ? `<h2>Billing Address: ${formatAddress(
            currentOrder?.billingAddress
          )}</h2>`
        : ""
    }
    <h1>Order Summary</h1>
    <table>
      <tr>
        <th>Order ID</th>
        <td>${currentOrder.id}</td> 
      </tr>
      <tr>
        <th>Order Date</th>
        <td>${formatDate(currentOrder?.orderDate)}</td>
      </tr>
    </table>
    <div >
      <h1>Order Details</h1>
      <table>
        <tr>
          <th>Sl. No.</th>
          <th>Product Name</th>
          <th>Product Qty</th>
          <th>Product Price</th>
        </tr>
        ${currentOrder.items
          .map(
            (line, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${toPascalCase(line.productName)}</td>
            <td>${line.count}</td>
            <td>&#8377; ${line.totalPrice}</td>
          </tr>
        `
          )
          .join("")}
      </table>

       <h1>Price Summary</h1>
      <table>
        <tr>
          <th>Sub Total</th>
          <td>&#8377;${parseFloat(currentOrder.subTotal).toFixed(2)}</td>
        </tr>
        <tr>
          <th>Tax</th>
          <td>&#8377;${parseFloat(currentOrder.tax).toFixed(2)}</td>
        </tr>
        <tr>
          <th>Total</th>
          <td>&#8377;${roundedTotalAmount}</td>
        </tr>
        <tr>
          <th>Amount in Words</th>
          <td>${amountInWords}</td>
        </tr>
      
        <tr>
          <th>Order Placed By</th>
          <td>${currentOrder?.createdByName}</td>
        </tr>
        
        <tr>
          <th>Phone Number</th>
          <td>${phoneNumber}</td>
        </tr>
      </table>
  
   
      <div class="footer-text">
        Invoice Creation Date: ${formatCurrentDateTime()}
      </div>
    </div>
    
    ${
      showPrintButton
        ? `<button class="print-button" onclick="printPage()">Print</button>`
        : ""
    }
   
  </body>
</html>`;
};

// Function to save base64 PDF to storage
export const saveBase64PdfToStorage = async (
  base64Pdf: string,
  fileName: string
): Promise<string | void> => {
  // Define the file path
  const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}.pdf`;

  try {
    // Write the file
    await RNFS.writeFile(filePath, base64Pdf, "base64");
    notifyMessage("Success", `PDF saved successfully to ${filePath}`);
    return filePath; // Return the file path
  } catch (error) {
    notifyMessage(
      "Error",
      "Error saving PDF to storage:" + error?.toString() ?? ""
    );
    throw error; // Re-throw the error if you want to handle it further up
  }
};

export const savePdfToStorage = async (
  pdf: string | Blob,
  fileName: string
): Promise<string | void> => {
  // Define the file path
  const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}.pdf`;

  try {
    // if (typeof pdf === 'string') {
    //   // Handle base64 string
    //   await RNFS.writeFile(filePath, pdf, 'base64');
    // } else
    {
      // Handle Blob

      const reader = new FileReader();
      reader.readAsDataURL(pdf as Blob);
      reader.onloadend = async () => {
        const base64Data = (reader.result as string)?.split(",")[1];
        if (base64Data) {
          await RNFS.writeFile(filePath, base64Data, "base64");
          notifyMessage("Success", `PDF saved successfully to ${filePath}`);
          return filePath; // Return the file path
        } else {
          throw new Error("Failed to convert Blob to base64");
        }
      };
    }

    notifyMessage("Success", `PDF saved successfully to ${filePath}`);
    return filePath; // Return the file path
  } catch (error) {
    notifyMessage(
      "Error",
      "Error saving PDF to storage: " + error?.toString() ?? ""
    );
    throw error; // Re-throw the error if you want to handle it further up
  }
};
