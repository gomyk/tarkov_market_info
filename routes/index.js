var express = require('express');
var router = express.Router();
var request = require('request');
var mongoose = require('mongoose');
var price = require('../models/price.js');
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index.html');
});



// function saveSuggestionLog(parsed_json) {
//   //save to mongodb
//   if (parsed_json.data_from_service.data[1].ReasoningEnginePersonalizedInterests.JRDFoxExceptionList == undefined) {
//     parsed_json.data_from_service.data[1].ReasoningEnginePersonalizedInterests.JRDFoxExceptionList = [];
//   }

//   var suggestion = new Suggestion({
//     timestamp: Date.now(),
//     bixby_client_version: parsed_json.bixby_client_version,
//     bixby_service_version: parsed_json.bixby_service_version,
//     country_code: parsed_json.country_code,
//     startTimeInMillis: parsed_json.data_from_service.startTimeInMillis,
//     startTime: parsed_json.data_from_service.startTime,
//     endTimeInMillis: parsed_json.data_from_service.endTimeInMillis,
//     endTime: parsed_json.data_from_service.endTime,
//     result: parsed_json.data_from_service.result,
//     device_id: parsed_json.device_id,
//     fileexist: parsed_json.fileexist,
//     hint_data_count: parsed_json.hint_data_count,
//     hint_data_list: parsed_json.hint_data_list,
//     log_version: parsed_json.log_version,
//     is_negative_feedback: parsed_json.is_negative_feedback,
//     session_id: parsed_json.session_id,
//     interestList: parsed_json.data_from_service.data[0].interestList,
//     sessionId: parsed_json.data_from_service.data[0].sessionId,
//     RawdataConverterPassedDataList: parsed_json.data_from_service.data[1].ReasoningEnginePersonalizedInterests.RawdataConverterPassedDataList,
//     RunestoneProfileConverterPassedDataList: parsed_json.data_from_service.data[1].ReasoningEnginePersonalizedInterests.RunestoneProfileConverterPassedDataList,
//     getPersonalizedInterestsList: parsed_json.data_from_service.data[1].ReasoningEnginePersonalizedInterests.getPersonalizedInterestsList,
//     resultList: parsed_json.data_from_service.data[1].ReasoningEnginePersonalizedInterests.resultList,
//     JRDFoxExceptionList: parsed_json.data_from_service.data[1].ReasoningEnginePersonalizedInterests.JRDFoxExceptionList
//   });

//   suggestion.save(function (err, object) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log('sessionId : ' + object.session_id + ' success');
//   });
// }

// function saveFeedbackLog(parsed_json) {
//   //save to mongodb

//   var feedback = new Feedback({
//     timestamp: Date.now(),
//     bixby_client_version: parsed_json.bixby_client_version,
//     bixby_service_version: parsed_json.bixby_service_version,
//     country_code: parsed_json.country_code,
//     device_id: parsed_json.device_id,
//     command_list: parsed_json.feedback.command_list,
//     interest: parsed_json.feedback.interest,
//     interest_feedback: parsed_json.feedback.interest_feedback,
//     fileexist: parsed_json.fileexist,
//     filename: parsed_json.filename,
//     session_id: parsed_json.session_id,
//     is_negative_feedback: parsed_json.is_negative_feedback
//   });
//   Feedback.find({ session_id: parsed_json.session_id, interest: parsed_json.interest }, function (err, result) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log
//     if (result.length > 0) {
//       Feedback.update({ session_id: parsed_json.session_id, interest: parsed_json.interest },
//         { is_negative_feedback: parsed_json.is_negative_feedback }, function (err, object) {
//           if (err) {
//             return console.log(err);
//           }
//           console.log('sessionId : ' + object.session_id + ' success');
//         });
//     } else {
//       feedback.save(function (err, object) {
//         if (err) {
//           return console.log(err);
//         }
//         console.log('sessionId : ' + object.session_id + ' success');
//       });
//     }
//   });
// }

// function saveJsonToFile(jsonObject) {
//   try {
//     fs.writeFileSync('./uploads/output/' + jsonObject.filename + '.json',
//       JSON.stringify(jsonObject));
//   } catch (err) {
//     console.log(err);
//   }
// }

// function sendToLogServer(jsonObject, index) {
//   request({
//     url: 'http://localhost:3003/' + index,
//     method: 'POST',
//     json: jsonObject
//   }, function (err, res, body) {
//     if (err) {
//       console.log("Send log : Cannot send to logstash");
//       console.log(err);
//     } else {
//       console.log("Send log : OK");
//       if (index == 'feedback') {
//         updateFeedback(jsonObject.session_id, 'suggestion', 'negativefeedback');
//       }
//     }
//   });
// }
// function updateFeedback(session_id, index, field) {
//   var jsonObject = JSON.parse('{"query": { "match": {"session_id.keyword": "' + session_id + '"}},"script": {"source":"ctx._source.' + field + ' = true"}}');
//   request({
//     url: 'http://localhost:9200/' + index + '/_update_by_query',
//     method: 'POST',
//     json: jsonObject
//   }, function (err, res, body) {
//     if (err) {
//       console.log(session_id + ' : ' + field + ' : ' + index + " : Error");
//       console.log(err);
//     } else {
//       console.log(session_id + ' : ' + field + ' : ' + index + " : OK");
//     }
//   });
// }

// function updateFeedbackToDB(session) {
//   Suggestion.update({ session_id: session }, { negativefeedback: true }, function (err, update_result) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log(update_result);
//   });
// }

// function updateFileExistToDB(session) {
//   Suggestion.update({ session_id: session }, { fileexist: true }, function (err, update_result) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log(update_result);
//   });

//   Feedback.update({ session_id: session }, { fileexist: true }, { multi: true }, function (err, update_result) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log(update_result);
//   });
// }
module.exports = router;
