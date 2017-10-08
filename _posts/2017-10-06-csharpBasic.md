---
layout: post
title: C# 문법 정리
date: 2017-10-06 13:53:30
categories: Unity
tags: [programming, csharp, unity]
---

### 기본자료형

```csharp
int, long, float, double
char, string
bool

Int.Parse("123");
```

### 입력과 출력

```csharp
Console.WriteLine("테스트입니다");
var user = Console.ReadLine();
```

### 조건문

```csharp
if (true)
{

}
else if (false)
{

}
else
{

}

switche (num)
{
    case 0 :
        break;
    case 1 :
        break;
    default :
        break;
}
```

### 반복문

```csharp
while(true)
{

}
do
{

} while (true)

for (int i = 0; i < 1000; i++)
{

}
string[] array = {"사과", "배", "포도", "딸기", "바나나"}
foreach (string item in array)
{

}
```

### 클래스

```csharp
class Box
{
    private int width;
    public int Width
    {
        get
        {
            return width;
        }
        set
        {
            if (value < 0) { width = value; }
        }
    }

    private int height;
    public int Height
    {
        get
        {
            return height;
        }
        set
        {
            if (value > 0) { height = value; }
        }
    }

    public Box(int width, int height)
    {
            this.width = width;
            this.height = height;
    }

    public int Area()
    {
        return this.width * this.height
    }
}

```

### 상속

```csharp
class Parent
{
    public Parent()
    {
        Console.WriteLine("부모생성자");
    }
}

class Child : Parent
{
    publib Child() : base()
    {
        Console.WriteLine("자식생성자");
    }
}

```

### 하이딩

```csharp
class Parent
{
    public void Method() {}
}

class Child : Parent
{
    public new void Method() {}
}
```

### 오버라이딩

```csharp
class Parent
{
    public virtual void Method() {}
}
class Child : Parent
{
    public override void Method() {}
}

abstract class Parent
{
    public abstract void Method() {}
}
class Child : Parent
{
    public override void Method() {}
}
```

### 구조체

```csharp
struct Point
{
    public int mp;
    public string name;

    public Point(int mp)
    {
        this.mp = mp;
        this.name = "포인트";
    }
}
```

### 인터페이스

```csharp
class Product : IComparable
{
    public int Price{ get; set; }

    public override string ToString()
    {
        return Price+"원";
    }
    public int CompareTo(object obj)
    {
        return this.Price.CompareTo((obj as Product).Price);
    }
}

```

### 델리게이터, 람다

```csharp
List<Product> products = new List<Product>()
{
    new Product() {Price = 500},
    new Product() {Price = 200},
    new Product() {Price = 800},
};


// 델리게이터
products.Sort(SortWithPrice);
static int SortWithPrice(Product a, Product b)
{
    return a.Price.CompareTo(b.Price);
}

// 무명 델리게이터
products.Sort(delegate(Product a, Product b)
{
    return a.Price.CompareTo(b.Price);
});

// 람다
products.Sort((a,b)=>
{
    return a.Price.CompareTo(b.Price);
});
```
