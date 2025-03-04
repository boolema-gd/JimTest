
var logs=[];
logs.push($.Current.Value);
    var jsonObject=logs[0].content.attributes;
    const keys = ["Date","Time","PartnerName","ProgramNumber","AccountTransactionStatus","PartnerResponseText","ResponseText","TargetAccountNumber","EmailID","TransactionAmount","TransactionReferenceNumber","PartnerRequestId","MessageID","OriginalMessageId","SourceAccountNumber","BarcodeStatus","StoreName","StoreNumber","Address1","City","State","ZipCode"]
    const csvRows = [];

function DateFormat(dateText){
    var date=new Date(dateText);
// Get the date part
const datePart = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

// Get the time part
const timePart = date.toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false // Use 24-hour time format
});

return {Date:datePart,Time:timePart};
}

function formatNumber(number, options = {}) {
    return number.toLocaleString('en-US', options);
}

    // Add the header row
    csvRows.push(keys.join(','));

    // Add the data rows
    _.forEach(logs,(obj1) => {
        var obj=obj1.content.attributes;
        const values = keys.map(key =>{
            if(key=="Date" && "time" in obj){
var date=DateFormat(obj["time"]) ;
return date.Date;
            }else  if(key=="Time" && "time" in obj){
var date= DateFormat(obj["time"]) ;
return date.Time;
            }else if(key=="TransactionAmount" && "TransactionAmount" in obj){
                return formatNumber(_.round(obj["TransactionAmount"],2), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});
            }
           return key in obj?obj[key]:"";
            });
        csvRows.push(values.map((v,i)=>'"'+v+'"').join(','));
    });

    return csvRows.join('\n');
