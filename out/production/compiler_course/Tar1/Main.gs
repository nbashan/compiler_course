package Tar1

uses java.io.File
//input fileName.vm
//output fileName.asm


//LOGIC:
//Constructs a parser - handling INPUT file
//Constructs a CodeWriter - handling OUTPUT file
//Marchest through the input file, parsing each line and generating code from it
public class Main {

  public static function translateVmFile(path: String, outputFile: String){

    var d = new File(path)
    var file_list = Arrays.asList(d.list())
    var codeWriter = new CodeWriter(outputFile)

    if (file_list.contains("Sys.vm"))
      codeWriter.writer.write(Tools.bootStrap)
    foreach(inputFile in file_list) {
      var file_name = inputFile.split("\\.")

      if(file_name[1] == "vm"){
      var parser = new Parser(path+"\\"+inputFile)
      while (parser.advance()) {
        var commandType = parser.getCommandType()
        switch (commandType) {
          case C_NO_PARAMETERS:
            codeWriter.writeNoParameters(parser.getCommand())
            break
          case C_ONE_PAREMETER:
            codeWriter.writeOneParameter(parser.getCommand())
            break
          case C_TWO_PATAMETERS:
            codeWriter.writeTwoParameters(parser.getCommand())
            break
          case C_PUSH_POP:
            codeWriter.writePushPop(parser.getCommand())
          default:

        }
      }
      parser.closeFile()
    }
      }
    codeWriter.closeFile()
  }
}