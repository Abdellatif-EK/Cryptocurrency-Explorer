# Cryptocurrency Explorer

This project is a Next.js application that allows users to explore cryptocurrency market data and trends.

## Installation

To install and run this project, you'll need to have pnpm installed on your system. If you don't have pnpm installed, you can install it by following the instructions on the [official pnpm website](https://pnpm.io/installation).

1. Clone the repository:

   ```
   git clone https://github.com/your-username/crypto-market-explorer.git
   cd crypto-market-explorer
   ```
2. Install dependencies:

   ```
   pnpm install
   ```
3. Build the project:

   ```
   pnpm run build
   ```
4. Run the project:

   ```
   pnpm run start
   ```

The application should now be running on `http://localhost:3000`.

## Task 2: Algorithmic

Here are implementations of the requested algorithm in JavaScript and Python:

### JavaScript Implementation

```javascript
function printNumbers() {
  for (let i = 1; i <= 100; i++) {
    let output = '';
    if (i % 3 === 0) output += 'Hello';
    if (i % 5 === 0) output += 'World';
    if (i % 7 === 0) output += 'Yoo';
    console.log(output || i);
  }
}

printNumbers();
```

### Python Implementation

```python
def print_numbers():
    for i in range(1, 101):
        output = ''
        if i % 3 == 0: output += 'Hello'
        if i % 5 == 0: output += 'World'
        if i % 7 == 0: output += 'Yoo'
        print(output or i)

print_numbers()
```

Output (for both implementations):

1
2
Hello
4
World
Hello
Yoo
8
Hello
World
11
Hello
13
Yoo
HelloWorld
16
17
Hello
19
World
HelloYoo
22
23
Hello
World
26
Hello
Yoo
29
HelloWorld
31
32
Hello
34
WorldYoo
Hello
37
38
Hello
World
41
HelloYoo
43
44
HelloWorld
46
47
Hello
Yoo
World
Hello
52
53
Hello
World
Yoo
Hello
58
59
HelloWorld
61
62
HelloYoo
64
World
Hello
67
68
Hello
WorldYoo
71
Hello
73
74
HelloWorld
76
Yoo
Hello
79
World
Hello
82
83
HelloYoo
World
86
Hello
88
89
HelloWorld
Yoo
92
Hello
94
World
Hello
97
Yoo
Hello
World

## Task 3: Logic

To find your friend's red car on an infinite bidirectional highway in a finite amount of time, you can use an expanding search pattern. Here's the approach:

1. Start at your current position (let's call it point 0).
2. Drive 1 unit distance to the right, then return to point 0.
3. Drive 2 units to the left, then return to point 0.
4. Drive 4 units to the right, then return to point 0.
5. Drive 8 units to the left, then return to point 0.
6. Continue this pattern, doubling the distance each time and alternating directions.

This approach ensures that you will eventually find your friend's car, regardless of which direction it is in or how far away it is. The search pattern covers an ever-expanding area, guaranteeing that you'll reach your friend's location in a finite amount of time.

This method is known as an exponential search or doubling search and is an efficient way to search an unbounded space when you don't know which direction to go.
