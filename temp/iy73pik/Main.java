import java.util.Scanner;

public class TwoNumberSum {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int a = scanner.nextInt();
        int b = scanner.nextInt();

        // Calculate the sum
        int sumResult = a + b;

        // Output the result
        System.out.println("The sum is: " + sumResult);
    }
}
