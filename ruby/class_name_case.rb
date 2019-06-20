# ref. https://ja.stackoverflow.com/questions/4596/case%E3%81%A7%E5%A4%89%E6%95%B0%E3%81%AE%E3%82%AF%E3%83%A9%E3%82%B9%E3%82%92%E6%AF%94%E8%BC%83%E3%81%97%E3%82%88%E3%81%86%E3%81%A8%E3%81%99%E3%82%8B%E3%81%A8%E4%B8%8A%E6%89%8B%E3%81%8F%E8%A1%8C%E3%81%8B%E3%81%AA%E3%81%84/4598
class A
  def compare_class_name
    p "self class name is #{self.class}"
    # "self class name is A"

    case self.class.name
    when "A"
      p "A"
    when "B"
      p "B"
    end
    # =>  "A"

    case self.class
    when A
      p "A"
    when B
      p "B"
    when Class
      p "Class"
    end
    # =>  "Class"

    case self
    when A
      p "A"
    when B
      p "B"
    when Class
      p "Class"
    end
    # =>  "A"

  end
end

class B
end

A.new.compare_class_name

p '------'

def class_type_check_with_case n
  p "n.class is #{n.class}"
  # => n.class is A"

  case n.class.name
  when 'A' then p "A"
  when 'B' then p "B"
  end
  # => "A"

  case n.class
  when A then p "A"
  when B then p "B"
  when Class then p "Class"
  end
  # => "Class"

  case n.class
  when A then p "A"
  when B then p "B"
  when String then p "String"
  when Module then p "Module"
  when Class then p "Class"
  end
  # => "Module"

  case n
  when A then p "A"
  when B then p "B"
  when Class then p "Class"
  end
  # => "A"

end

class_type_check_with_case A.new

p "case は === を使った if-elsif-end と等価"
p "whenの条件 === caseの比較対象 として扱われる"

a = A.new
p a.class # => A

p "A === a.class?"
if A === a.class
  p true
else
  p false
end
# => false

puts "A == a.class?"
if A == a.class
  p true
else
  p false
end
# => true

p '---'

p 'a.class.kind_of?(A)'
p a.class.kind_of?(A)
# => false

p '-----'

puts "Class === a.class?"
if Class === a.class
  p true
else
  p false
end
# => true

p '---'

p 'a.class.kind_of?(Class)'
p a.class.kind_of?(Class)
# => true

p 'a.class.kind_of?(Module)'
p a.class.kind_of?(Module)
# => true

p 'a.class.kind_of?(Object)'
p a.class.kind_of?(Object)
# => true

p '-----'

puts "A === a?"
if A === a
  p true
else
  p false
end
# => true

p '---'

p 'a.kind_of?(A)'
p a.kind_of?(A)
# => true

p '------'
p "str".class
# => String

p "String" === "str".class.name
# => true

p String === "str"
# => true

p String === "str".class
# => false

p String == "str".class
# => true

p Class === String.class
# => true
