provider "aws" {
  region = "eu-central-1"
}

resource "aws_eks_cluster" "devops_stack_cluster" {
  name    = "devops_stack_cluster"
  subnets = aws_subnet.devops_stack_subnet.*.id
  vpc_config {
    subnet_ids = aws_subnet.devops_stack_subnet.*.id
  }
}

resource "aws_vpc" "devops_stack_vpc" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "devops_stack_subnet" {
  count          = 3
  cidr_block     = "10.0.${count.index.index + 1}.0/24"
  vpc_id         = aws_vpc.devops_stack_vpc.id
  availability_zone = "eu-central-1"
}

output "kubeconfig" {
  value = aws_eks_cluster.devops_stack_cluster.kubeconfig
}
