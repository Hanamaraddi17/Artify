{
  /* Display Success or Error Messages */
}
{
  submitStatus === "success" && (
    <Alert>
      <AlertDescription>Artwork uploaded successfully!</AlertDescription>
    </Alert>
  );
}
{
  submitStatus === "error" && (
    <Alert variant="danger">
      <AlertDescription>An error occurred. Please try again.</AlertDescription>
    </Alert>
  );
}
