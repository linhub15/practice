/**
 * Example 1:
 * Input: l1 = [2,4,3], l2 = [5,6,4]
 * Output: [7,0,8]
 * Explanation: 342 + 465 = 807.
 *
 * Example 2:
 *
 * Input: l1 = [0], l2 = [0]
 * Output: [0]
 *
 * Example 3:
 *
 * Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
 * Output: [8,9,9,9,0,0,0,1]
 */

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function toNumber(node: ListNode): bigint {
  const num = [];
  num.unshift(node.val.toString());
  if (!node.next) {
    return BigInt(num.join(""));
  }
  num.unshift(toNumber(node.next).toString());
  return BigInt(num.flat().join(""));
}

function toListNode(num: string): ListNode | null{
    const asString = num.split("");
    const digit = asString.at(-1);
    if (digit === undefined) return null;

    asString.pop();
    const remaining = asString.join("");
    if (remaining.length === 0) return new ListNode(+digit);

    return new ListNode(+digit, toListNode(remaining));
}

// console.log(toNumber(new ListNode(1, new ListNode(2, new ListNode(3)))));

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  const sum = toNumber(l1!) + toNumber(l2!);
  return toListNode(sum.toString());
}


const node = toListNode([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1].join(""));
console.log(toNumber(node).toString())
