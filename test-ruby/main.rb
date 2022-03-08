class Animal
    attr_reader :name
  
    def initialize(name)
      @name = name
    end
  
    def welcome
      puts "your name is  : #{name}."
      speak
    end
end
  
  class Dog < Animal
    def speak
      puts 'Woof'
    end
  end
  
  class Cat < Animal
    def speak
      puts 'Meow'
    end
  end
  

def main
    my_dog = Dog.new('Rex')
    my_dog.welcome
    my_cat = Cat.new('Pera')
    my_cat.welcome
end

main()

