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

  case n.class
  when A then p "A"
  when B then p "B"
  when Class then p "Class"
  end
  # => "Class"

  case n
  when A then p "A"
  when B then p "B"
  when Class then p "Class"
  end
  # => "A"

end

class_type_check_with_case A.new

p '------'

p "str".class.name === "String"
# => true

p "str" === String
# => true
p "str".class
# => String
p "str".class === String
# => false
p "str".class == String
# => true

p String.class === Class
# => true


