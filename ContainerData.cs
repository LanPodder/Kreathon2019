using System;
public class ContainerData
{

    public ContainerData(string type, int price, int size)
    {
        ContainerType = type;
        ContainerPrice = price;
        ContainerSize = size;
    }
    public string ContainerType { get; set; }
    public int ContainerPrice { get; set; }
    public int ContainerSize { get; set; }
}