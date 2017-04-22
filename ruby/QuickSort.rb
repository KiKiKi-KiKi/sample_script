# Quick Sort
# refs. https://www.codereading.com/algo_and_ds/algo/quick_sort.html
require 'benchmark'

N = 10000
a = Array.new
rnd_seed = Random.new(0)
0.upto(N-1) {|i| a << rnd_seed.rand(1..1000)}

# Quick Sort
def q_sort(arr)
  if arr.length < 1
    return arr
  end

  pivot = arr[0]
  left = []
  right = []

  for i in (1...arr.length)
    x = arr[i]
    if x <= pivot
      left << x
    else
      right << x
    end
  end

  left = q_sort(left)
  right = q_sort(right)

  f = [pivot]

  return left + f + right
end

# p a

def main(arr)
  puts "Array.sort"
  res1 = Benchmark.measure do
    z = arr.sort
    # p z
  end
  puts Benchmark::CAPTION
  puts res1

  puts "Quick Sort"
  res2 = Benchmark.measure do
    z = q_sort(arr)
    # p z
  end
  puts Benchmark::CAPTION
  puts res2
end

main(a)
