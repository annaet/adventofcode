/**
--- Day 4: Passport Processing ---
You arrive at the airport only to realize that you grabbed your North Pole Credentials instead of your passport. While these documents are extremely similar, North Pole Credentials aren't issued by a country and therefore aren't actually valid documentation for travel in most of the world.

It seems like you're not the only one having problems, though; a very long line has formed for the automatic passport scanners, and the delay could upset your travel itinerary.

Due to some questionable network security, you realize you might be able to solve both of these problems at the same time.

The automatic passport scanners are slow because they're having trouble detecting which passports have all required fields. The expected fields are as follows:

byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
cid (Country ID)
Passport data is validated in batch files (your puzzle input). Each passport is represented as a sequence of key:value pairs separated by spaces or newlines. Passports are separated by blank lines.

Here is an example batch file containing four passports:

ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in
The first passport is valid - all eight fields are present. The second passport is invalid - it is missing hgt (the Height field).

The third passport is interesting; the only missing field is cid, so it looks like data from North Pole Credentials, not a passport at all! Surely, nobody would mind if you made the system temporarily ignore missing cid fields. Treat this "passport" as valid.

The fourth passport is missing two fields, cid and byr. Missing cid is fine, but missing any other field is not, so this passport is invalid.

According to the above rules, your improved system would report 2 valid passports.

Count the number of valid passports - those that have all required fields. Treat cid as optional. In your batch file, how many passports are valid?
*/

import { readLines } from '../utils/txt';

interface Passport {
  byr?: string,
  iyr?: string,
  eyr?: string,
  hgt?: string,
  hcl?: string,
  ecl?: string,
  pid?: string,
  cid?: string,
}

function isPassportField(field: string): field is keyof Passport {
  const regex = new RegExp(/(byr)|(iyr)|(eyr)|(hgt)|(hcl)|(ecl)|(pid)|cid/);
  return regex.test(field);
}

const convertToPassports = (lines: string[]): Passport[] => {
  const passports: Passport[] = [];

  let currentPassport: Passport = {};
  lines.forEach((line, i) => {
    if (line === '') {
      passports.push(currentPassport);
      currentPassport = {};
    } else {
      const parts = line.split(' ');
      parts.forEach((part) => {
        const field = part.split(':');
        if (isPassportField(field[0])) {
          currentPassport[field[0]] = field[1];
        } else {
          throw new Error(`Field ${field[0]} not recognised on line ${i}`);
        }
      });
    }
  });
  // Add last passport
  passports.push(currentPassport);

  return passports;
}

const isValidPassportPart1 = (passport: Passport): boolean => {
  return Boolean(passport.byr && passport.iyr && passport.eyr && passport.hgt && passport.hcl && passport.ecl && passport.pid);
}

const countValidPassportsPart1 = (passports: Passport[]): number => {
  return passports.reduce((count, passport) => isValidPassportPart1(passport) ? ++count : count, 0);
}

const part1 = (file: string): number => {
  const passports = convertToPassports(readLines(file));
  return countValidPassportsPart1(passports);
}

/**
--- Part Two ---
The line is moving more quickly now, but you overhear airport security talking about how passports with invalid data are getting through. Better add some data validation, quick!

You can continue to ignore the cid field, but each other field has strict rules about what values are valid for automatic validation:

byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
If cm, the number must be at least 150 and at most 193.
If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.
Your job is to count the passports where all required fields are both present and valid according to the above rules.

Count the number of valid passports - those that have all required fields and valid values. Continue to treat cid as optional. In your batch file, how many passports are valid?
*/

const testRange = (field: string, min: number, max: number) => {
  const number = Number.parseInt(field, 10);
  if (number < min || number > max) {
    throw new Error(`Invalid range for ${field} between ${min} and ${max}`);
  }
}

const testHeight = (field: string) => {
  const regex = new RegExp(/(\d+)(cm|in)\b/);
  const match = field.match(regex);
  if (!match || match.length !== 3) {
    throw new Error('Invalid height');
  }
  if (match[2] === 'cm') {
    testRange(match[1], 150, 193);
  } else {
    testRange(match[1], 59, 76);
  }
}

const testHairColour = (field: string) => {
  const regex = new RegExp(/\#([0-9]|[a-f]){6}\b/);
  if (!regex.test(field)) {
    throw new Error('Invalid hair colour');
  }
}

const testEyeColour = (field: string) => {
  const regex = new RegExp(/(amb|blu|brn|gry|grn|hzl|oth)\b/);
  if (!regex.test(field)) {
    throw new Error('Invalid eye colour');
  }
}

const testPassportId = (field: string) => {
  const regex = new RegExp(/\b\d{9}\b/);
  if (!regex.test(field)) {
    throw new Error('Invalid passport id');
  }
}

const isValidPassportPart2 = (passport: Passport): boolean => {
  if (!Boolean(passport.byr && passport.iyr && passport.eyr && passport.hgt && passport.hcl && passport.ecl && passport.pid)) {
    return false;
  }

  try {
    // Birth Year
    testRange(passport.byr ?? '', 1920, 2002);
    testRange(passport.iyr ?? '', 2010, 2020);
    testRange(passport.eyr ?? '', 2020, 2030);
    testHeight(passport.hgt ?? '');
    testHairColour(passport.hcl ?? '');
    testEyeColour(passport.ecl ?? '');
    testPassportId(passport.pid ?? '');
  } catch (e) {
    return false;
  }

  return true;
}

const countValidPassportsPart2 = (passports: Passport[]): number => {
  return passports.reduce((count, passport) => isValidPassportPart2(passport) ? ++count : count, 0);
}

const part2 = (file: string): number => {
  const passports = convertToPassports(readLines(file));
  return countValidPassportsPart2(passports);
}

export {
  part1,
  part2,
}