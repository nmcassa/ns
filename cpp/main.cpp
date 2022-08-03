#include <iostream>
#include <fstream> //read file
#include <stdexcept> //errors
#include <sstream>
#include <vector>
using namespace std;

vector<string> splitString(string str) {
  stringstream ss(str);
  string to;
  vector<string> code;

  while (getline(ss, to, '\n')) {
    code.push_back(to);
  }

  return code;
}

vector<string> getWordsFromString(string str) {
  string word = "";
  vector<string> ret;

  for (char letter : str) {
    if (letter == ' ') {
      ret.push_back(word);
      word = "";
    } else {
      word = word + letter;
    }
  }
  ret.push_back(word);

  return ret;
}

void vectorToString(vector<string> code) {
  for (string item : code) {
    cout << item << endl;
  }
}

template <size_t N>
bool searchArrayChar(char (&arr)[N], char target) {
  for (char item : arr) {
    if (item == target) {
      return true;
    }
  }
  return false;
}

class Variable {
  private:

    string name;
    string value;
    string type = "str";

  public:

    Variable(string n, string v) {
      name = n;
      value = v;
    }

    Variable() {
      name = "";
      value = "";
    }

    string getName() {
      return name;
    }

    string getType() {
      return type;
    }

    void setType(string n) {
      type = n;
    }

    string getValue() {
      return value;
    }

    void toString() {
      cout << "name: " << name << " value: " << value << endl;
    }

    bool checkNum() {
      char digits[10] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};
      int numDot = 0;

      for (char i : value) {
        if (i == '.') {
          numDot++;
          continue;
        }
        if (!searchArrayChar(digits, i)) {
          return false;
        }
      }

      if (numDot > 1) {
        return false;
      }
      return true;
    }
};

class Token {
  private:
    Variable tokenVar;

    bool hasChildren;
    bool isStatement;
    bool isExpression;
    bool isDeclaration;
    bool isOutput;

    vector<Token*> children;
  
  public:
    Token() {
      hasChildren = false;
      isStatement = false;
      isExpression = false;
      isDeclaration = false;
      isOutput = false;
    }

    void setType(string str) {
      //if or for
      if (str == "statement") {
        isStatement = true;
        hasChildren = true;
      } 
      //var declaration
      else if (str == "declaration") {
        isDeclaration = true;
      }
      //expression 
      else if (str == "expression") {
        isExpression = true;
        hasChildren = true;
      }
      //print statement
      else if (str == "output") {
        isOutput = true;
      }
      //shouldn't reach here
      else {
        throw invalid_argument("not a valid token type");
      }
    }
};

vector<Variable> memory;

vector<string> lex(vector<string> code) {
  for (string line : code) {
    vector<string> words = getWordsFromString(line);
    
    if (words.at(0) == "var") {
      Token newTok = Token();
      newTok.setType("declaration");
    }
  }

  return code;
}

int main() {
  string myText;
  string total;

  ifstream MyReadFile("../hello.nick");

  // Use a while loop together with the getline() function to read the file line by line
  while (getline (MyReadFile, myText)) {
    total = total + myText + "\n";
  }

  MyReadFile.close();

  vector<string> code = splitString(total);

  code = lex(code);

  memory.at(0).toString();

  return 0;
}