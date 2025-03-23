const express = require('express');
const app = express();
const bodyP = require('body-parser');
const compiler = require('compilex');
const options = {
  stats: true
};
const fs = require('fs');
compiler.init(options);

app.use(bodyP.json());
app.use(
    '/codemirror-5.65.17', express.static('G:/CodeFlex/codemirror-5.65.17'));

app.get('/', function(req, res) {
  compiler.flush(function() {
    console.log('deleted');
  });
  res.sendFile('G:/CodeFlex/index.html');
});

app.post('/compile', function(req, res) {
  var code = req.body.code;
  var input = req.body.input;
  var lang = req.body.lang;

  let processCompleted = false;  // Flag to ensure only one response is sent

  try {
    if (lang === 'Cpp') {
      var envData = {OS: 'windows', cmd: 'g++', options: {timeout: 10000}};
      if (!input) {
        compiler.compileCPP(envData, code, function(data) {
          if (processCompleted) return;  // Prevent sending response twice
          if (data.output) {
            res.send(data);
          } else {
            res.send({output: 'error'});
          }
          processCompleted = true;
        });
      } else {
        compiler.compileCPPWithInput(envData, code, input, function(data) {
          if (processCompleted) return;  // Prevent sending response twice
          if (data.output) {
            res.send(data);
          } else {
            res.send({output: 'error'});
          }
          processCompleted = true;
        });
      }
    } else if (lang === 'Java') {
      var envData = {OS: 'windows'};
      if (!input) {
        compiler.compileJava(envData, code, function(data) {
          if (processCompleted) return;  // Prevent sending response twice
          if (data.output) {
            res.send(data);
          } else {
            res.send({output: 'error'});
          }
          processCompleted = true;
        });
      } else {
        compiler.compileJavaWithInput(envData, code, input, function(data) {
          if (processCompleted) return;  // Prevent sending response twice
          if (data.output) {
            res.send(data);
          } else {
            res.send({output: 'error'});
          }
          processCompleted = true;
        });
      }
    } else if (lang === 'Python') {
      var envData = {OS: 'windows'};
      if (!input) {
        compiler.compilePython(envData, code, function(data) {
          if (processCompleted) return;  // Prevent sending response twice
          if (data.output) {
            res.send(data);
          } else {
            res.send({output: 'error'});
          }
          processCompleted = true;
        });
      } else {
        compiler.compilePythonWithInput(envData, code, input, function(data) {
          if (processCompleted) return;  // Prevent sending response twice
          if (data.output) {
            res.send(data);
          } else {
            res.send({output: 'error'});
          }
          processCompleted = true;
        });
      }
    }
  } catch (e) {
    if (processCompleted) return;  // Prevent sending response twice if an error occurs
    console.log('Error' + e.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// For Cpp
app.get('/template/cpp', function(req, res) {
  fs.readFile(
      'G:/CodeFlex/templates/cpp_template.txt', 'utf8', function(err, data) {
        if (err) {
          res.status(500).send('Template not found');
        } else {
          res.send({template: data});
        }
      });
});

// For Java
app.get('/template/java', function(req, res) {
  fs.readFile(
      'G:/CodeFlex/templates/java_template.txt', 'utf8', function(err, data) {
        if (err) {
          res.status(500).send('Template not found');
        } else {
          res.send({template: data});
        }
      });
});

// For Python
app.get('/template/python', function(req, res) {
  fs.readFile(
      'G:/CodeFlex/templates/python_template.txt', 'utf8', function(err, data) {
        if (err) {
          res.status(500).send('Template not found');
        } else {
          res.send({template: data});
        }
      });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
