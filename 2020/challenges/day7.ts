/**
--- Day 7: Handy Haversacks ---
You land at the regional airport in time for your next flight. In fact, it looks like you'll even have time to grab some food: all flights are currently delayed due to issues in luggage processing.

Due to recent aviation regulations, many rules (your puzzle input) are being enforced about bags and their contents; bags must be color-coded and must contain specific quantities of other color-coded bags. Apparently, nobody responsible for these regulations considered how long they would take to enforce!

For example, consider the following rules:

light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
These rules specify the required contents for 9 bag types. In this example, every faded blue bag is empty, every vibrant plum bag contains 11 bags (5 faded blue and 6 dotted black), and so on.

You have a shiny gold bag. If you wanted to carry it in at least one other bag, how many different bag colors would be valid for the outermost bag? (In other words: how many colors can, eventually, contain at least one shiny gold bag?)

In the above rules, the following options would be available to you:

A bright white bag, which can hold your shiny gold bag directly.
A muted yellow bag, which can hold your shiny gold bag directly, plus some other bags.
A dark orange bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
A light red bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
So, in this example, the number of bag colors that can eventually contain at least one shiny gold bag is 4.

How many bag colors can eventually contain at least one shiny gold bag? (The list of rules is quite long; make sure you get all of it.)
*/

import { readLines } from '../utils/txt';

interface Bag {
  colour: string,
}

interface InnerBag extends Bag {
  number: number,
}

interface Rule {
  outerBag: Bag,
  innerBags: InnerBag[],
}

const parseRules = (lines: string[]): Rule[] => {
  const rules: Rule[] = lines.map((line) => {
    const bags = line.split(' contain ');

    if (bags.length < 2) {
      throw new Error(`Unexpected rule structure found in: ${line}`);
    }

    const outerBag = bags[0];
    const innerBagsString = bags[1];

    const outerBagColour = outerBag.split(' bags')[0];

    if (innerBagsString.includes('no other bags')) {
      return {
        outerBag: {
          colour: outerBagColour,
        },
        innerBags: [],
      }
    }

    const bagsRegex = /(?<number>\d+) (?<colour>\w+ \w+) bags?/g;
    let innerBagMatch = bagsRegex.exec(innerBagsString);
    const innerBags: InnerBag[] = [];
    do {
      innerBags.push({
        colour: innerBagMatch?.groups?.colour ?? '',
        number: parseInt(innerBagMatch?.groups?.number ?? '0', 10),
      });
    } while((innerBagMatch = bagsRegex.exec(innerBagsString)) !== null);

    return {
      outerBag: {
        colour: outerBagColour,
      },
      innerBags: innerBags,
    }
  });

  return rules;
}

interface Node {
  colour: string,
  contains: Node[],
  containedBy: Node[],
}

interface Edge {
  from: Node,
  to: Node,
  number: number,
}

let nodes: Node[] = [];
let edges: Edge[] = [];

const findNode = (colour: string) => {
  return nodes.find((n) => n.colour === colour);
}

const createNode = (bag: Bag): Node => {
  const node = {
    colour: bag.colour,
    contains: [],
    containedBy: [],
  };
  nodes.push(node);
  return node;
}

const createEdge = (from: Node, to: Node, number: number) => {
  edges.push({
    from,
    to,
    number,
  });
}

const initGraph = () => {
  nodes = [];
  edges = [];
}

const buildGraph = (rules: Rule[]) => {
  rules.forEach((rule) => {
    let outerBagNode = findNode(rule.outerBag.colour) ?? createNode(rule.outerBag);

    rule.innerBags.forEach((innerBag) => {
      let innerBagNode = findNode(innerBag.colour) ?? createNode(innerBag);
      outerBagNode.contains.push(innerBagNode);
      innerBagNode.containedBy.push(outerBagNode);
      createEdge(outerBagNode, innerBagNode, innerBag.number);
    });
  });
}

const findBagsContainedBy = (node: Node, colours: Set<string>): Set<string> => {
  return node.containedBy.reduce((prevColours, node) => {
    if (prevColours.has(node.colour)) {
      return prevColours;
    }
    prevColours.add(node.colour);
    return findBagsContainedBy(node, prevColours);
  }, colours);
}

const part1 = (file: string): number => {
  const lines = readLines(file);
  const rules: Rule[] = parseRules(lines);

  initGraph();
  buildGraph(rules);

  const myBagNode = findNode('shiny gold');

  if (!myBagNode) {
    throw new Error('My bag does not exist');
  }

  const colours = findBagsContainedBy(myBagNode, new Set<string>());
  return colours.size;
}

/**
--- Part Two ---
It's getting pretty expensive to fly these days - not because of ticket prices, but because of the ridiculous number of bags you need to buy!

Consider again your shiny gold bag and the rules from the above example:

faded blue bags contain 0 other bags.
dotted black bags contain 0 other bags.
vibrant plum bags contain 11 other bags: 5 faded blue bags and 6 dotted black bags.
dark olive bags contain 7 other bags: 3 faded blue bags and 4 dotted black bags.
So, a single shiny gold bag must contain 1 dark olive bag (and the 7 bags within it) plus 2 vibrant plum bags (and the 11 bags within each of those): 1 + 1*7 + 2 + 2*11 = 32 bags!

Of course, the actual rules have a small chance of going several levels deeper than this example; be sure to count all of the bags, even if the nesting becomes topologically impractical!

Here's another example:

shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.
In this example, a single shiny gold bag must contain 126 other bags.

How many individual bags are required inside your single shiny gold bag?
*/

const findEdge = (from: Node, to: Node) => {
  return edges.find((edge) => edge.from === from && edge.to === to);
}

const countContents = (node: Node): number => {
  return node.contains.reduce((total, child) => {
    const edge = findEdge(node, child);
    if (!edge) {
      return 0;
    }
    const contents = countContents(child);
    const edgeTotal = edge.number + edge.number * contents;
    return edgeTotal + total;
  }, 0);
}

const part2 = (file: string): number => {
  const lines = readLines(file);
  const rules: Rule[] = parseRules(lines);

  initGraph();
  buildGraph(rules);

  const myBagNode = findNode('shiny gold');

  if (!myBagNode) {
    throw new Error('My bag does not exist');
  }

  return countContents(myBagNode);
}

export {
  part1,
  part2,
}