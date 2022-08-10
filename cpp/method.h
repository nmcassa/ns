#include <string>
#include <stdexcept>
#include <vector>
#include <sstream>
#include <iostream>

void checkForKeyword(std::string str);

std::vector<std::string> splitString(std::string str);

std::vector<std::string> getWordsFromString(std::string str);

void vectorToString(std::vector<std::string> code);

std::string getSubVector(std::vector<std::string> arr, int start, int end = -1);